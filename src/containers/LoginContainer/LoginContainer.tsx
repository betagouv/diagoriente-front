import React, { lazy } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import NotFound from '../../layout/NotFound';
import { ReduxState, IUser } from 'reducers';
import Header from '../../layout/Header/Header';
const LoginUser = lazy(() => import('./LoginUser'));
const RestPassword = lazy(() => import('./RestPassword'));

type Props = RouteComponentProps & {
  user: IUser | {};
};

const LoginContainer = ({ user }: Props) => {
  if (!isEmpty(user)) return <Redirect to={'/'} />;
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={'/login'} component={LoginUser} />
        <Route exact path={'/login/user'} component={LoginUser} />
        <Route exact path={'/login/renewPassword'} component={RestPassword} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

const mapStateToProps = ({ authUser }: ReduxState) => ({
  user: authUser.user,
});

export default connect(mapStateToProps)(LoginContainer);
