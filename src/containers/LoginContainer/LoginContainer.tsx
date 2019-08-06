import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from '../../layout/NotFound';
import Header from '../../layout/Header/Header';

import LoginUser from './LoginUser';
import LoginAdvisor from './LoginAdvisor';
import RestPassword from './RestPassword';

const LoginContainer = () => (
  <React.Fragment>
    <Header showLogout={false} pathTo="/" />
    <Switch>
      <Route exact path="/login" component={LoginUser} />
      <Route exact path="/login/user" component={LoginUser} />
      <Route exact path="/login/advisor" component={LoginAdvisor} />
      <Route exact path="/login/renewPassword" component={RestPassword} />
      <Route component={NotFound} />
    </Switch>
  </React.Fragment>
  );

export default LoginContainer;
