import React, { Suspense, lazy } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';
import { ITheme } from '../../requests';

const LazyCompetenceContainer = lazy(() => import('./CompetenceContainer'));

// lazy loader should be the same as the loader inside the component so the user do see any difference when
// we render this component
export default (props: RouteComponentProps<{ id: string }> & { theme: ITheme; goNext: () => void }) => (
  <Suspense fallback={<LazyLoader />}>
    <LazyCompetenceContainer {...props} />
  </Suspense>
);
