import React, { Dispatch, useState, useRef } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { RouteComponentProps, Redirect, Prompt } from 'react-router-dom';
import { isEqual, map } from 'lodash';

// types
import { ReduxState, ITheme, IParcoursResponse, IActivity } from 'reducers';
import { AnyAction } from 'redux';
import { IUpdateParcoursParams } from '../../requests';

// Api
import withApi, { ApiComponentProps } from '../../hoc/withApi';
import { listThemes } from '../../requests/themes';

// components
import SideBar from '../../components/sideBar/SideBar/SideBar';
import SideBarMobile from '../../components/sideBar/SidebarMobile/SideBarMobile';
import PathStepper from '../../components/PathStepper/Path';
import Info from '../../components/ui/Info/Info';
import Grid from '../../components/ui/Grid/Grid';
import CardTheme from '../../components/cards/Card/Card';
import Title from '../../components/Title/Title';
import ContinueButton from '../../components/buttons/ContinueButtom/ContinueButton';
import classNames from '../../utils/classNames';

// utils
import { decodeUri } from '../../utils/url';

// hooks
import { useDidMount, useDidUpdate, useWillUnmount } from '../../hooks';
import themesActions from '../../reducers/themes';
import parcoursActions from '../../reducers/parcours';
import activityActions from '../../reducers/activity';
// styles
import classes from './themesContainer.module.scss';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';

interface IMapToProps {
  themes: ITheme[];
  fetching: boolean;
  error: string;
  parcours: IParcoursResponse;
  activity: any;
}

interface IDispatchToProps {
  addTheme: (theme: ITheme) => void;
  removeTheme: (theme: ITheme) => void;
  parcoursRequest: (args: IUpdateParcoursParams) => void;
  updateThemes: (themes: ITheme[]) => void;
  getActivity: (id: any) => void;
}
interface IState {
  themesFiltred: ITheme[];
}

type Props = RouteComponentProps & ApiComponentProps<{ list: typeof listThemes }> & IMapToProps & IDispatchToProps;

const ThemesContainer = ({
  list,
  themes,
  parcours,
  addTheme,
  removeTheme,
  history,
  parcoursRequest,
  fetching,
  error,
  location,
  updateThemes,
  getActivity,
  activity,
}: Props) => {
  let { type } = decodeUri(location.search);
  type = type === 'professional' ? type : 'personal'; /// change style if type is professional
  if (
    type === 'professional' &&
    parcours.skills
      .filter(skill => skill.theme.type === 'personal')
      .find(skill => !(skill.activities.length && skill.competences.length))
  ) {
    return <Redirect to={'/profile'} />;
  }
  const [open, setOpen] = useState(false);
  const [themesFiltred, setThemesFiltred] = useState(list.data.data);
  const [value, setValue] = useState('');

  const toggleOpen = () => setOpen(!open);
  useDidMount(() => {
    list.call({ type });
  });

  useWillUnmount(() => {
    updateThemes(parcours.skills.map(skill => skill.theme));
  });

  const onClick = () => {
    parcoursRequest({
      skills: themes.map(theme => {
        const skill = parcours.skills.find(skill => skill.theme._id === theme._id);
        if (skill) {
          return {
            theme: skill.theme._id,
            activities: skill.activities.map(({ _id }) => _id),
            type: theme.type,
            competences: skill.competences.filter(({ value }) => value !== 0),
          };
        }

        return { theme: theme._id, type: theme.type, activities: [], competences: [] };
      }),
    });
  };
  const onMouseEnter = (id: string) => {
    getActivity({ id });
  };
  const handleSearch = async (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    if (event.currentTarget.value === '') {
      list.call({
        type,
      });
    } else if (event.currentTarget.value.length > 2) {
      list.call({
        type,
        search: event.currentTarget.value,
      });
    }
  };

  useDidUpdate(() => {
    if (!fetching && !error) {
      const skills = parcours.skills.filter(skill => skill.theme.type === type);
      const { length } = skills;
      let i = 0;
      let nextTheme = null;
      while (i < length && !nextTheme) {
        const currentTheme = skills[i];
        if (!(currentTheme.activities.length && currentTheme.competences.length)) {
          nextTheme = currentTheme;
        } else {
          i += 1;
        }
      }

      let nextUrl = `/theme/${skills[0].theme._id}`;
      if (nextTheme) {
        nextUrl =
          nextTheme.activities.length === 0
            ? `/theme/${nextTheme.theme._id}/activities`
            : `/theme/${nextTheme.theme._id}/skills`;
      }
      const action = type === 'professional' ? 'replace' : 'push';
      history[action](nextUrl);
    }
  },           [fetching]);

  /* if (list.fetching) return <div>...loading</div>; */
  const { data } = list.data;
  let themesComponents: JSX.Element[] = [];
  if (data) {
    themesComponents = data.map(theme => {
      const selected = themes.find(row => row._id === theme._id);
      const onClick = () => {
        const action = selected ? removeTheme : addTheme;
        action(theme);
      };
      return (
        <Grid key={theme._id} item xl={3} lg={4} md={6} sm={12} className={classes.grid_padding}>
          <CardTheme
            data-tip
            data-for={theme._id}
            key={theme._id}
            onClick={onClick}
            checked={!!selected}
            type={theme.type}
            onMouseEnter={() => onMouseEnter(theme._id)}
          >
            {theme.title}
            <ReactTooltip id={theme._id} type="light" className={'tooltip'}>
              <div className={classes.activity_container}>
                {activity.data.activities && activity.data.activities.length !== 0
                  ? map(activity.data.activities, (e: any) => <span key={e._id}>{e.title}</span>)
                  : theme.title}
              </div>
            </ReactTooltip>
          </CardTheme>
        </Grid>
      );
    });
  }
  const onNavigate = (index: number, p: string) => {
    if (index === 0) {
      history.push('/profile');
    }
    if (index === 1) {
      history.push('/themes');
    }
  };

  const listThemes = themes.filter(theme => theme.type === type);
  return (
    <div className={classes.container_themes}>
      <Prompt
        when={!isEqual(parcours.skills.map(skill => skill.theme), themes)}
        message={'Êtes-vous sûr de vouloir fermer cette page?\nVous allez perdre vos modifications'}
      />
      <SideBar disabled options={listThemes} type={type} />
      <SideBarMobile toggleOpen={toggleOpen} open={open} options={listThemes} type={type} />
      <div className={classes.content_themes}>
        <Grid container padding={{ xl: 50, md: 30 }} spacing={{ xl: 0 }}>
          <Grid item xl={12}>
            <PathStepper options={['Ma carte de compétences']} onClick={onNavigate} type={type} />
          </Grid>
          <Grid item xl={12} className={classes.grid_padding}>
            <Title
              logo={themes.length ? themes[themes.length - 1].resources.icon : undefined}
              title={type === 'professional' ? 'Mes expériences professionnelles' : 'Mes expériences personnelles'}
              type={type}
            />
          </Grid>
          <Grid item xl={12}>
            <Info
              borderColor={type === 'professional' ? '#f9e5de' : '#ede7ff'}
              backgroundColor={type === 'professional' ? '#f9f3f3' : '#f9f3f3'}
              className={type === 'professional' ? classes.info_pro : classes.info}
            >
              <span>Choisis des thèmes qui correspondent à des activités que tu as l’habitude de faire</span>
              <br />
              <span className={classes.italic_text}>
                passe la souris sur les thèmes pour avoir un aperçu des activités
              </span>
            </Info>
          </Grid>
          {type === 'professional' ? (
            <Grid item xl={12}>
              <Grid container padding={{ xl: 20 }}>
                <div className={classes.searchContainer}>
                  <input
                    type="text"
                    value={value}
                    className={classNames(classes.inputSearch, classes.borderInputPro)}
                    onChange={handleSearch}
                    placeholder="Recherche ..."
                  />
                </div>
              </Grid>
            </Grid>
          ) : null}
          <Grid item xl={12}>
            <Grid container padding={{ xl: 0 }} spacing={{ xl: 30, md: 25 }}>
              {themesComponents}
            </Grid>
          </Grid>
          <Grid item xl={12} className={classes.continue_container}>
            <ContinueButton
              disabled={listThemes.length === 0}
              onClick={onClick}
              isFetching={fetching}
              className={type === 'professional' ? classes.button_pro : classes.buttonPerso}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = ({ parcours, themes, activity }: ReduxState): IMapToProps => ({
  themes,
  fetching: parcours.fetching,
  error: parcours.error,
  parcours: parcours.data,
  activity,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  addTheme: theme => dispatch(themesActions.addTheme({ theme })),
  removeTheme: theme => dispatch(themesActions.removeTheme({ theme })),
  parcoursRequest: args => dispatch(parcoursActions.parcoursRequest(args)),
  updateThemes: themes => dispatch(themesActions.updateThemes({ themes })),
  getActivity: (id: any) => dispatch(activityActions.getActivityRequest(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApi({ list: listThemes })(ThemesContainer));
