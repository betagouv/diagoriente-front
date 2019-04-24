import React, { Suspense, lazy } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';

const LazyThemeContainer = lazy(() => import('./ThemeContainer'));

export default (props: RouteComponentProps<{ id: string }>) => (
  <Suspense fallback={<LazyLoader />}>
    <LazyThemeContainer {...props} />
  </Suspense>
);
