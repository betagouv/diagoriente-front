import React from 'react';
import { connect } from 'react-redux';
import { ReduxState, User } from 'reducers';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { encodeUri } from '../utils/url';

type Props = { user: User } & RouteProps;

const ProtectedRoute = ({ user, ...other }: Props) => {
  if (!user.user) {
    return <Redirect to="/" />;
  }
  return <Route {...other} />;
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.authUser.user,
});

export default connect(mapStateToProps)(ProtectedRoute);
