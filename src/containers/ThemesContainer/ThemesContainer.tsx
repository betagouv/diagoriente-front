import React, { Dispatch, useState, useRef } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { RouteComponentProps, Redirect, Prompt } from 'react-router-dom';
import { isEqual } from 'lodash';

// types
import { ReduxState, ITheme, IParcoursResponse } from 'reducers';
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

// styles
import classes from './themesContainer.module.scss';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';

interface IMapToProps {
  themes: ITheme[];
  fetching: boolean;
  error: string;
  parcours: IParcoursResponse;
}

interface IDispatchToProps {
  addTheme: (theme: ITheme) => void;
  removeTheme: (theme: ITheme) => void;
  parcoursRequest: (args: IUpdateParcoursParams) => void;
  updateThemes: (themes: ITheme[]) => void;
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

  useDidMount(() => {
    list.call({ type });
  });

  useWillUnmount(() => {
    updateThemes(parcours.skills.map(skill => skill.theme));
  });

  useDidUpdate(() => {
    if (type === 'professional' && !list.fetching && !list.error) {
      const skills = parcours.skills.map(skill => {
        return {
          theme: skill.theme._id,
          activities: skill.activities.map(({ _id }) => _id),
          type: skill.theme.type,
          competences: skill.competences,
        };
      });

      if (!skills.find(skill => skill.type === 'professional')) {
        skills.push({
          theme: list.data.data[0]._id,
          activities: [],
          type: 'professional',
          competences: [],
        });
      }

      parcoursRequest({
        skills,
      });
    }
  },           [list.fetching]);

  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const onClick = () => {
    parcoursRequest({
      skills: themes.map(theme => {
        const skill = parcours.skills.find(skill => skill.theme._id === theme._id);
        if (skill) {
          return {
            theme: skill.theme._id,
            activities: skill.activities.map(({ _id }) => _id),
            type: theme.type,
            competences: skill.competences,
          };
        }

        return { theme: theme._id, type: theme.type, activities: [], competences: [] };
      }),
    });
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

  if (list.fetching) return <div>...loading</div>;
  const { data } = list.data;
  let themesComponents: JSX.Element[] = [];
  if (data) {
    if (type === 'professional') {
      return <LazyLoader />;
    }
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
          >
            {theme.title}
            <ReactTooltip id={theme._id} type="light" className={'tooltip'}>
              {theme.title}
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
              borderColor={type === 'professional' ? '#dec8dd' : '#ede7ff'}
              backgroundColor={type === 'professional' ? '#fbeef9' : '#f7f7ff'}
              className={type === 'professional' ? classes.info_pro : ''}
            >
              Choisis des thèmes qui correspondent à des activités que tu as l’habitude de faire
            </Info>
          </Grid>
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
              className={type === 'professional' ? classes.button_pro : ''}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = ({ parcours, themes }: ReduxState): IMapToProps => ({
  themes,
  fetching: parcours.fetching,
  error: parcours.error,
  parcours: parcours.data,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  addTheme: theme => dispatch(themesActions.addTheme({ theme })),
  removeTheme: theme => dispatch(themesActions.removeTheme({ theme })),
  parcoursRequest: args => dispatch(parcoursActions.parcoursRequest(args)),
  updateThemes: themes => dispatch(themesActions.updateThemes({ themes })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApi({ list: listThemes })(ThemesContainer));
