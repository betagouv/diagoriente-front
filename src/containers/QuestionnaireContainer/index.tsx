import React, { Suspense, lazy } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';
import { ITheme } from 'reducers';

const LazyActivitiesContainer = lazy(() => import('./QuestionnaireContainer'));

export default () => (
  <Suspense fallback={<LazyLoader />}>
    <LazyActivitiesContainer />
  </Suspense>
);
