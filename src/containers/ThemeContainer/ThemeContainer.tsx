import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ReduxState, ITheme, ISkillPopulated } from 'reducers';
import { isEmpty } from 'lodash';

// containers
import ActivitiesContainer from '../ActivitiesContainer/ActivitiesContainer';
import CompetenceContainer from '../CompetenceContainer/CompetenceContainer';

// components
import SideBar from '../../components/sideBar/SideBar/SideBar';
import SideBarMobile from '../../components/sideBar/SidebarMobile/SideBarMobile';
import PathStepper from '../../components/PathStepper/Path';
import Grid from '../../components/ui/Grid/Grid';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';
import Title from '../../components/Title/Title';
import SuccessModal from '../../components/modals/SuccessModal/SuccessModal';
import classNames from '../../utils/classNames';
// not found
import NotFound from '../../layout/NotFound';

// api
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import { getTheme, IUpdateParcoursParams } from '../../requests';

// actions
import modalActions from '../../reducers/modal';
import parcoursActions from '../../reducers/parcours';

// styles
import classes from './theme.module.scss';
import Spinner from '../../components/ui/Spinner/Spinner';

interface IMapToProps {
  themes: ITheme[];
  skills: ISkillPopulated[];
  parcoursFetching: boolean;
}

interface IDispatchToProps {
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
  parcoursRequest: (args: IUpdateParcoursParams) => void;
}

type Props = RouteComponentProps<{ id: string }> &
  IDispatchToProps &
  IMapToProps &
  ApiComponentProps<{ get: typeof getTheme }>;

const ThemeContainer = ({
  match,
  themes,
  history,
  get,
  skills,
  openModal,
  closeModal,
  parcoursRequest,
  parcoursFetching,
}: Props) => {
  const { id } = match.params;
  const currentIndex = themes.findIndex(theme => theme._id === id); // index in all themes
  const currentTheme = themes[currentIndex];
  const successContinueClick = () => {
    history.push('/carte');
    closeModal();
  };
  const oldSuccessContinueClick = () => {
    history.push('/profile');
    closeModal();
  };

  /*--- get Next phase ---*/
  let nextUrl: string | null = null;
  const currentSkillsType = skills.filter(skill => currentTheme && skill.theme.type === currentTheme.type);
  const currentThemes = themes.filter(theme => currentTheme && theme.type === currentTheme.type);
  const indexInCurrent = currentThemes.findIndex(theme => theme._id === id); // index after filter with type
  const { length } = currentSkillsType;
  let i = 0;
  let nextTheme = null;
  while (i < length && !nextTheme) {
    const currentTheme = currentSkillsType[i];
    if (!(currentTheme.activities.length && currentTheme.competences.length)) {
      nextTheme = currentTheme;
    } else {
      i += 1;
    }
  }

  if (nextTheme) {
    nextUrl =
      currentSkillsType[i].activities.length === 0
        ? `/theme/${nextTheme.theme._id}/activities`
        : `/theme/${nextTheme.theme._id}/skills`;
  } else if (indexInCurrent < currentThemes.length - 1) {
    nextUrl = `/theme/${currentThemes[indexInCurrent + 1]._id}/activities`;
  }
  /*--- get Next phase ---*/

  const goNext = () => {
    if (nextUrl) {
      history.replace(nextUrl);
    } else {
      openModal(<SuccessModal type={currentTheme.type} onClick={successContinueClick} />, classes.backdrop);
    }
  };

  const onThemeRemove = (theme: any) => {
    if (theme._id === id) {
      const nextIndex = currentIndex === themes.length - 1 ? 0 : currentIndex + 1;
      history.replace(`/theme/${themes[nextIndex]._id}/activities`);
    }
    const newSkills = skills.filter(skill => skill.theme._id !== theme._id);
    parcoursRequest({
      skills: newSkills.map(skill => ({
        theme: skill.theme._id,
        activities: skill.activities.map(({ _id }) => _id),
        competences: skill.competences,
      })),
    });
  };

  const mounted = useRef(false);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  useLayoutEffect(() => {
    if (!mounted.current) mounted.current = true;
    get.call(id);
  },              [match.params.id]);

  if (currentIndex === -1) return <NotFound />;
  if (match.isExact) return <Redirect to={`/theme/${id}/activities`} />;
  const { data, fetching, error } = get;

  const fetchingComponent = (
    <div style={{ background: '#fff' }} className={'absolute_fill flex_center'}>
      <LazyLoader />
    </div>
  );

  // should be the same loader used in competence page
  if ((fetching && isEmpty(data)) || !mounted.current) return fetchingComponent;
  if (error) return <div>{error}</div>;
  if (isEmpty(data)) return <NotFound />;

  const stepperOptions = ['Ma carte de compétences'];
  if (currentTheme) {
    stepperOptions.push(currentTheme.title);
  }
  const onNavigate = (index: number, p: string) => {
    if (index === 0) {
      history.push('/profile');
    }
    if (index === 1) {
      history.push(`/themes?type=${currentTheme.type}`);
    }
  };

  const listThemes = themes.filter(theme => currentTheme && theme.type === currentTheme.type);

  return (
    <div className={classes.container_themes}>
      <SideBar
        options={listThemes.map(theme => ({ ...theme, isSelected: id === theme._id }))}
        type={currentTheme && currentTheme.type}
        onItemRemove={listThemes.length === 1 ? undefined : onThemeRemove}
      />
      <SideBarMobile
        toggleOpen={toggleOpen}
        open={open}
        options={listThemes.map(theme => ({ ...theme, isSelected: id === theme._id }))}
        type={currentTheme && currentTheme.type}
      />
      <div className={classes.content_themes}>
        <Grid container padding={{ xl: 50, md: 30 }} spacing={{ xl: 0 }}>
          <Grid item xl={12}>
            <PathStepper options={stepperOptions} onClick={onNavigate} type={currentTheme && currentTheme.type} />
          </Grid>
          <Grid item xl={12} className={classes.grid_padding}>
            {currentTheme && (
              <Title title={currentTheme.title} logo={currentTheme.resources.icon} type={currentTheme.type} />
            )}
          </Grid>
          <Switch>
            <Route
              path={'/theme/:id/activities'}
              render={props => <ActivitiesContainer {...props} theme={data} />}
              exact
            />
            <Route
              path={'/theme/:id/skills'}
              exact
              render={props => <CompetenceContainer {...props} theme={data} goNext={goNext} nextUrl={nextUrl} />}
            />
            <Route component={NotFound} />
          </Switch>
          {fetching && fetchingComponent}
        </Grid>
      </div>
      {parcoursFetching && (
        <div className={`fixed_fill flex_center ${classes.spinner_container}`}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ themes, parcours }: ReduxState): IMapToProps => ({
  themes,
  skills: parcours.data.skills,
  parcoursFetching: parcours.fetching,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  openModal: (children, backdropClassName) => dispatch(modalActions.openModal({ children, backdropClassName })),
  closeModal: () => dispatch(modalActions.closeModal()),
  parcoursRequest: args => dispatch(parcoursActions.parcoursRequest(args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApis({ get: getTheme })(ThemeContainer));
