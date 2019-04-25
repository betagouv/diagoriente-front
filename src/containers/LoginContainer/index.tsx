import React, { Suspense, lazy } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';

const LazyLoginContainer = lazy(() => import('./LoginContainer'));

// TODO add RouteComponentProps to props when we start add functionality
export default (props: any) => (
  <Suspense fallback={<LazyLoader />}>
    <LazyLoginContainer {...props} />
  </Suspense>
);
