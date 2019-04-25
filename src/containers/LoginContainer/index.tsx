import React, { Suspense, lazy } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';

const LazyLoginContainer = lazy(() => import('./LoginContainer'));

export default (props: RouteComponentProps) => (
  <Suspense fallback={<LazyLoader />}>
    <LazyLoginContainer {...props} />
  </Suspense>
);
