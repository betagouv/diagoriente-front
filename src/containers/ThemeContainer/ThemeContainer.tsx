import React, { useRef, useState, useLayoutEffect } from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ReduxState, ITheme, ISkillPopulated } from 'reducers';
import { isEmpty, map } from 'lodash';
import ReactTooltip from 'react-tooltip';

// containers
import ActivitiesContainer from '../ActivitiesContainer';
import CompetenceContainer from '../CompetenceContainer';

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
import { getTheme } from '../../requests/themes';

// actions
import modalActions from '../../reducers/modal';

// styles
import classes from './theme.module.scss';
import { useDidMount } from '../../hooks';

interface IMapToProps {
  themes: ITheme[];
  skills: ISkillPopulated[];
}

interface IDispatchToProps {
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
}

type Props = RouteComponentProps<{ id: string }> &
  IDispatchToProps &
  IMapToProps &
  ApiComponentProps<{ get: typeof getTheme }>;

const ThemeContainer = ({ match, themes, history, get, skills, openModal, closeModal }: Props) => {
  const { id } = match.params;
  const currentIndex = themes.findIndex(theme => theme._id === id); // index in all themes

  const successContinueClick = () => {
    history.push('/profile');
    closeModal();
  };

  const goNext = () => {
    const currentTheme = themes[currentIndex];
    const currentSkillsType = skills.filter(skill => currentTheme && skill.theme.type === currentTheme.type);
    const currentThemes = themes.filter(theme => theme.type === currentTheme.type);
    const indexInCurrent = themes.findIndex(theme => theme._id === id); // index after filter with type
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
    let nextUrl = null;
    if (nextTheme) {
      nextUrl =
        currentSkillsType[i].activities.length === 0
          ? `/theme/${nextTheme.theme._id}/activities`
          : `/theme/${nextTheme.theme._id}/skills`;
    } else if (indexInCurrent < currentThemes.length - 1) {
      nextUrl = `/theme/${themes[currentIndex + 1]._id}/activities`;
    }
    if (nextUrl) {
      history.push(nextUrl);
    } else {
      openModal(<SuccessModal type={themes[currentIndex].type} onClick={successContinueClick} />, classes.backdrop);
    }
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
  const currentTheme = themes.find(theme => theme._id === match.params.id);
  if (currentTheme) {
    stepperOptions.push(currentTheme.title);
  }
  const onNavigate = (index: number, p: string) => {
    if (index === 0) {
      history.push('/profile');
    }
    if (index === 1) {
      history.push('/themes');
    }
  };

  const listThemes = themes.filter(theme => currentTheme && theme.type === currentTheme.type);

  return (
    <div className={classes.container_themes}>
      <SideBar
        options={listThemes.map(theme => ({ ...theme, isSelected: id === theme._id }))}
        type={currentTheme && currentTheme.type}
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
              render={props => <CompetenceContainer {...props} theme={data} goNext={goNext} />}
            />
            <Route component={NotFound} />
          </Switch>
          {fetching && fetchingComponent}
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = ({ themes, parcours }: ReduxState): IMapToProps => ({
  themes,
  skills: parcours.data.skills,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  openModal: (children, backdropClassName) => dispatch(modalActions.openModal({ children, backdropClassName })),
  closeModal: () => dispatch(modalActions.closeModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApis({ get: getTheme })(ThemeContainer));
