import React, { Dispatch, useState } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import ReactTooltip from 'react-tooltip';

// types
import { RouteComponentProps } from 'react-router-dom';
import { ReduxState, ITheme } from 'reducers';
import { AnyAction } from 'redux';

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

// hooks
import { useDidMount } from '../../hooks';
import parcoursActions from '../../reducers/parcours';

// styles
import classes from './themesContainer.module.scss';

interface IMapToProps {
  themes: ITheme[];
}

interface IDispatchToProps {
  addTheme: (theme: ITheme) => void;
  removeTheme: (theme: ITheme) => void;
}

type Props = RouteComponentProps & ApiComponentProps<{ list: typeof listThemes }> & IMapToProps & IDispatchToProps;

const ThemesContainer = ({ list, themes, addTheme, removeTheme, history }: Props) => {
  useDidMount(() => {
    list.call();
  });
  const [open, setOpen] = useState(false);

  const onClick = () => {
    history.push(`/theme/${themes[0]._id}`);
  };
  const toggleOpen = () => setOpen(!open);

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
            <ReactTooltip id={theme._id} type="light" className={classes.tooltip}>
              {theme.title}
            </ReactTooltip>

          </CardTheme>
        </Grid>
      );
    });
  }

  return (
    <>
      <div className={classes.container_themes}>
        <SideBar options={map(themes, theme => ({ value: theme.title }))} />
        <SideBarMobile toggleOpen={toggleOpen} open={open} options={map(themes, theme => ({ value: theme.title }))} />
        <div className={classes.content_themes}>
          <Grid container padding={{ xl: 50, md: 30 }} spacing={{ xl: 0 }}>
            <Grid item xl={12} ><PathStepper options={['Mes passions et mes hobbies']} /></Grid>
            <Grid item xl={12} className={classes.grid_padding}>
              <Title title="Trouve ta voie" />
            </Grid>
            <Grid item xl={12}>
              <Info borderColor="#ede7ff" backgroundColor="#f7f7ff">
                Complète les différentes rubriques pour enrichir ton profil de compétences
              </Info>
            </Grid>
            <Grid item xl={12} ><Grid container padding={{ xl: 0 }} spacing={{ xl: 30, md: 25 }} > {themesComponents}</Grid>  </Grid>
            <Grid item xl={12} style={{ display: 'flex', justifyContent: 'flex-end' }} >

              <ContinueButton disabled={themes.length === 0} onClick={onClick} />
            </Grid>
          </Grid>




        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ parcours }: ReduxState): IMapToProps => ({
  themes: parcours.themes,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  addTheme: theme => dispatch(parcoursActions.addTheme({ theme })),
  removeTheme: theme => dispatch(parcoursActions.removeTheme({ theme })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApi({ list: listThemes })(ThemesContainer));
