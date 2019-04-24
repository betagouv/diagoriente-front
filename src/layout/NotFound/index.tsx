import React, { Suspense, lazy } from 'react';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';

const LazyNotFound = lazy(() => import('./NotFound'));

// TODO add RouteComponentProps to props when we start add functionality
export default () => (
  <Suspense fallback={<LazyLoader />}>
    <LazyNotFound />
  </Suspense>
);
