import React, { Dispatch, useState } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';

// types
import { RouteComponentProps } from 'react-router-dom';
import { ReduxState } from 'reducers';
import { AnyAction } from 'redux';

// Api
import withApi, { ApiComponentProps } from '../../hoc/withApi';
import { listThemes } from '../../requests/themes';

// components
import SideBar from '../../components/sideBar/SideBar/SideBar';
import SideBarMobile from '../../components/sideBar/SidebarMobile/SideBarMobile';
import Info from '../../components/ui/Info/Info';
import Grid from '../../components/ui/Grid/Grid';
import CardTheme from '../../components/cards/Card/Card';
import Title from '../../components/Title/Title';

// hooks
import { useDidMount } from '../../hooks';
import parcoursActions from '../../reducers/parcours';

// styles
import classNames from '../../utils/classNames';
import classes from './themesContainer.module.scss';

interface IMapToProps {
  themes: string[];
}

interface IDispatchToProps {
  addTheme: (id: string) => void;
  removeTheme: (id: string) => void;
}

type Props = RouteComponentProps & ApiComponentProps<{ list: typeof listThemes }> & IMapToProps & IDispatchToProps;

const ThemesContainer = ({ list, themes, addTheme, removeTheme, history }: Props) => {
  useDidMount(() => {
    list.call();
  });
  const [open, setOpen] = useState(false)

  const onClick = () => {
    history.push(`/theme/${themes[0]}`);
  };
  const toggleOpen = () => setOpen(!open)

  if (list.fetching) return <div>...loading</div>;
  const { data } = list.data;
  let themesComponents: JSX.Element[] = [];
  if (data) {
    themesComponents = data.map(theme => {
      const selected = themes.find(id => id === theme._id);
      const onClick = () => {
        const action = selected ? removeTheme : addTheme;
        action(theme._id);
      };
      return (
        <Grid key={theme._id} item xl={3} md={6} sm={12} className={classes.grid_padding}>
          <CardTheme
            key={theme._id}
            onClick={onClick}
            checked={!!selected}
          >
            {theme.title}
          </CardTheme>
        </Grid>
      );
    });
  }

  return (
    <>
      <div className={classes.container_themes}>
        <SideBar options={map(themes, theme => ({ value: theme }))} />
        <SideBarMobile toggleOpen={toggleOpen} open={open} options={map(themes, theme => ({ value: theme }))} />
        <div className={classes.content_themes}>
          <Grid container padding={{ xl: 50, md: 30 }} spacing={{ xl: 0 }}>
            <Grid item xl={12} className={classes.grid_padding}>
              <Title title='Trouve ta voie' />
            </Grid>
            <Grid item xl={12}>
              <Info borderColor='#ede7ff' backgroundColor='#f7f7ff'>Complète les différentes rubriques pour enrichir ton profil de compétences</Info>
            </Grid>
          </Grid>
          <Grid container padding={{ xl: 50, md: 30 }} spacing={{ xl: 30, md: 25 }}>
            {themesComponents}
          </Grid>
        </div>
      </div>
      <button disabled={themes.length === 0} onClick={onClick}>
        Next
  </button>
    </>
  );
};

const mapStateToProps = ({ parcours }: ReduxState): IMapToProps => ({
  themes: parcours.themes,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  addTheme: id => dispatch(parcoursActions.addTheme({ id })),
  removeTheme: id => dispatch(parcoursActions.removeTheme({ id })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApi({ list: listThemes })(ThemesContainer));
