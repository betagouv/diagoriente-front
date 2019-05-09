import React, { Dispatch, useState } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

// types
import { RouteComponentProps, Redirect } from 'react-router-dom';
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
import { useDidMount, useDidUpdate } from '../../hooks';
import themesActions from '../../reducers/themes';
import parcoursActions from '../../reducers/parcours';

// styles
import classes from './themesContainer.module.scss';

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
}: Props) => {
  const { type } = decodeUri(location.search);
  if (
    type === 'professional' &&
    parcours.skills
      .filter(skill => skill.theme.type === 'personal')
      .find(skill => !(skill.activities.length && skill.competences.length))
  ) {
    return <Redirect to={'/profile'} />;
  }
  useDidMount(() => {
    const { type } = decodeUri(location.search);
    list.call({ type: type === 'professional' ? type : 'personal' });
  });

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
      const { length } = parcours.skills;
      let i = 0;
      let nextTheme = null;
      while (i < length && !nextTheme) {
        const currentTheme = parcours.skills[i];
        if (!(currentTheme.activities.length && currentTheme.competences.length)) {
          nextTheme = currentTheme;
        }
        i += 1;
      }
      history.push(nextTheme ? `/theme/${nextTheme.theme._id}/activities` : `/theme/${themes[0]._id}`);
    }
  },           [fetching]);

  if (list.fetching) return <div>...loading</div>;
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
        <Grid key={theme._id} item xl={3} md={6} sm={12} className={classes.grid_padding}>
          <CardTheme data-tip data-for={theme._id} key={theme._id} onClick={onClick} checked={!!selected}>
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
      history.push('/');
    }
    if (index === 1) {
      history.push('/themes');
    }
  };

  return (
    <div className={classes.container_themes}>
      <SideBar
        options={themes.filter(theme =>
          type === 'professional' ? theme.type === 'professional' : theme.type === 'personal',
        )}
      />
      <SideBarMobile
        toggleOpen={toggleOpen}
        open={open}
        options={themes.filter(theme =>
          type === 'professional' ? theme.type === 'professional' : theme.type === 'personal',
        )}
      />
      <div className={classes.content_themes}>
        <Grid container padding={{ xl: 50, md: 30 }} spacing={{ xl: 0 }}>
          <Grid item xl={12}>
            <PathStepper options={['Mes passions et mes hobbies']} onClick={onNavigate} />
          </Grid>
          <Grid item xl={12} className={classes.grid_padding}>
            <Title logo={themes.length ? themes[themes.length - 1].resources.icon : undefined} title="Trouve ta voie" />
          </Grid>
          <Grid item xl={12}>
            <Info borderColor="#ede7ff" backgroundColor="#f7f7ff">
              Complète les différentes rubriques pour enrichir ton profil de compétences
            </Info>
          </Grid>
          <Grid item xl={12}>
            <Grid container padding={{ xl: 0 }} spacing={{ xl: 30, md: 25 }}>
              {themesComponents}
            </Grid>
          </Grid>
          <Grid item xl={12} className={classes.continue_container}>
            <ContinueButton
              disabled={
                themes.filter(theme =>
                  type === 'professional' ? theme.type === 'professional' : theme.type === 'personal',
                ).length === 0
              }
              onClick={onClick}
              isFetching={fetching}
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApi({ list: listThemes })(ThemesContainer));
