import React, { Suspense, lazy } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';

const LazyHomeContainer = lazy(() => import('./HomeContainer'));

export default (props: RouteComponentProps) => (
  <Suspense fallback={<LazyLoader />}>
    <LazyHomeContainer {...props} />
  </Suspense>
);
