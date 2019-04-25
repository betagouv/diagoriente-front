import React from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { ReduxState } from 'reducers';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { IUser } from '../requests';

type Props = { user: IUser | {} } & RouteProps;

const ProtectedRoute = ({ user, ...other }: Props) => {
  if (isEmpty(user)) return <Redirect to={'/login/user'} />;
  return <Route {...other} />;
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.authUser.user,
});

export default connect(mapStateToProps)(ProtectedRoute);
