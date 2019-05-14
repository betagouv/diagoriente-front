import React, { Suspense, lazy } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import LazyLoader from '../../components/ui/LazyLoader/LazyLoader';
import { ITheme } from 'reducers';

const LazyActivitiesContainer: any = lazy(() => import('./ActivitiesContainer'));

export default (props: RouteComponentProps<{ id: string }> & { theme: ITheme }) => (
  <Suspense fallback={<LazyLoader />}>
    <LazyActivitiesContainer {...props} />
  </Suspense>
);
