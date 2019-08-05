import React, { lazy } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import NotFound from '../../layout/NotFound';
import { ReduxState, User } from 'reducers';
import Header from '../../layout/Header/Header';
import RegisterUser from './RegisterUser';

type Props = RouteComponentProps & {
  user: User;
};

const RegisterContainer = ({ user }: Props) => {
  if (!isEmpty(user)) return <Redirect to={'/'} />;

  return (
    <>
     {/*  <Header showLogout={false} pathTo="/" /> */}
      <Switch>
        <Route  path={'/login'} component={RegisterUser} />
        <Route exact path={'/register/user'} component={RegisterUser} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

const mapStateToProps = ({ authUser }: ReduxState) => ({
  user: authUser.user,
});

export default connect(mapStateToProps)(RegisterContainer);
