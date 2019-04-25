import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../../layout/NotFound';

const LoginUser = lazy(() => import('./LoginUser'));

const LoginContainer = () => {
  return (
    <Switch>
      <Route exact path={'/login'} component={LoginUser} />
      <Route exact path={'/login/user'} component={LoginUser} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default LoginContainer;
