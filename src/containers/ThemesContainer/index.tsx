import React, { Suspense, lazy } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';

const LazyThemesContainer = lazy(() => import('./ThemesContainer'));

// TODO add RouteComponentProps to props when we start add functionality
export default (props: RouteComponentProps) => (
  <Suspense fallback={<LazyLoader />}>
    <LazyThemesContainer {...props} />
  </Suspense>
);
