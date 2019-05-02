import React, { useRef, useLayoutEffect } from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReduxState, ITheme } from 'reducers';
import { isEmpty } from 'lodash';

// containers
import ActivitiesContainer from '../ActivitiesContainer';
import CompetenceContainer from '../CompetenceContainer';

// not found
import NotFound from '../../layout/NotFound';
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import { getTheme } from '../../requests/themes';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';

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
      // Don't know with url to redirect user when he end all themes
      history.push('/');
    }
  };

  const mounted = useRef(false);

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

  return (
    <div>
      <h1>{data.title}</h1>

      <Switch>
        <Route path={'/theme/:id/activities'} render={props => <ActivitiesContainer {...props} theme={data} />} exact />
        <Route
          path={'/theme/:id/skills'}
          exact
          render={props => <CompetenceContainer {...props} theme={data} goNext={goNext} />}
        />
        <Route component={NotFound} />
      </Switch>
      {fetching && fetchingComponent}
    </div>
  );
};

const mapStateToProps = ({ parcours }: ReduxState) => ({
  themes: parcours.themes,
});

export default connect(mapStateToProps)(withApis({ get: getTheme })(ThemeContainer));
