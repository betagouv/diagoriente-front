import React, { Suspense, lazy } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';

const LazyProfileContainer = lazy(() => import('./ProfileContainer'));

// TODO type Props
export default (props: any) => (
  <Suspense fallback={<LazyLoader />}>
    <LazyProfileContainer {...props} />
  </Suspense>
);
