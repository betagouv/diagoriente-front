import React, { useRef, useState, useLayoutEffect } from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReduxState, ITheme } from 'reducers';
import { isEmpty, map } from 'lodash';
import ReactTooltip from 'react-tooltip';

// containers
import ActivitiesContainer from '../ActivitiesContainer';
import CompetenceContainer from '../CompetenceContainer';

// components
import SideBar from '../../components/sideBar/SideBar/SideBar';
import SideBarMobile from '../../components/sideBar/SidebarMobile/SideBarMobile';
import PathStepper from '../../components/PathStepper/Path';
import Info from '../../components/ui/Info/Info';
import Grid from '../../components/ui/Grid/Grid';
import ContinueButton from '../../components/buttons/ContinueButtom/ContinueButton';
import Title from '../../components/Title/Title';

// not found
import NotFound from '../../layout/NotFound';
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import { getTheme } from '../../requests/themes';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';

// styles
import classes from './theme.module.scss';

interface IMapToProps {
  themes: ITheme[];
}

type Props = RouteComponentProps<{ id: string }> & IMapToProps & ApiComponentProps<{ get: typeof getTheme }>;

const ThemeContainer = ({ match, themes, history, get }: Props) => {
  const { id } = match.params;
  const currentIndex = themes.findIndex(theme => theme._id === id);
  const goNext = () => {
    if (currentIndex < themes.length - 1) {
      history.push(`/theme/${themes[currentIndex + 1]._id}`);
    } else {
      history.push('/profile');
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

  const stepperOptions = ['Mes passions et mes hobbies'];
  const currentTheme = themes.find(theme => theme._id === match.params.id);
  if (currentTheme) {
    stepperOptions.push(currentTheme.title);
  }

  return (
    <>
      <div className={classes.container_themes}>
        <SideBar options={map(themes, theme => ({ value: theme.title }))} />
        <SideBarMobile toggleOpen={toggleOpen} open={open} options={themes} />
        <div className={classes.content_themes}>
          <Grid container padding={{ xl: 50, md: 30 }} spacing={{ xl: 0 }}>
            <Grid item xl={12}>
              <PathStepper options={stepperOptions} />
            </Grid>
            <Grid item xl={12} className={classes.grid_padding}>
              {currentTheme && <Title title={currentTheme.title} logo={currentTheme.resources.icon} />}
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
    </>
  );
};

const mapStateToProps = ({ parcours }: ReduxState) => ({
  themes: parcours.themes,
});

export default connect(mapStateToProps)(withApis({ get: getTheme })(ThemeContainer));
