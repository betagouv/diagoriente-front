import React, { lazy } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import NotFound from '../../layout/NotFound';
import { ReduxState, IUser } from 'reducers';

const RegisterUser = lazy(() => import('./RegisterUser'));

type Props = RouteComponentProps & {
  user: IUser | {};
};

const RegisterContainer = ({ user }: Props) => {
  if (!isEmpty(user)) return <Redirect to={'/'} />;

  return (
    <Switch>
      <Route exact path={'/register'} component={RegisterUser} />
      <Route exact path={'/register/user'} component={RegisterUser} />
      <Route component={NotFound} />
    </Switch>
  );
};

const mapStateToProps = ({ authUser }: ReduxState) => ({
  user: authUser.user,
});

export default connect(mapStateToProps)(RegisterContainer);