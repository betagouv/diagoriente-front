import React, { lazy } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import NotFound from '../../layout/NotFound';
import { ReduxState, IUser } from 'reducers';

const LoginUser = lazy(() => import('./LoginUser'));

type Props = RouteComponentProps & {
  user: IUser | {};
};

const LoginContainer = ({ user }: Props) => {
  if (!isEmpty(user)) return <Redirect to={'/'} />;
  console.log(location.pathname);
  return (
    <Switch>
      <Route exact path={'/login'} component={LoginUser} />
      <Route exact path={'/login/user'} component={LoginUser} />
      <Route component={NotFound} />
    </Switch>
  );
};

const mapStateToProps = ({ authUser }: ReduxState) => ({
  user: authUser.user,
});

export default connect(mapStateToProps)(LoginContainer);
