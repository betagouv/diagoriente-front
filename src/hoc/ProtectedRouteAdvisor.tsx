import React from 'react';
import { connect } from 'react-redux';
import { ReduxState, Advisor } from 'reducers';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { encodeUri } from '../utils/url';

type Props = { advisor: Advisor } & RouteProps;

const ProtectedRoute = ({ advisor, ...other }: Props) => {
  if (!advisor.advisor) {
    return <Redirect to="/" />;
  }
  return <Route {...other} />;
};

const mapStateToProps = (state: ReduxState) => ({
  advisor: state.authAdvisor.advisor,
});

export default connect(mapStateToProps)(ProtectedRoute);
