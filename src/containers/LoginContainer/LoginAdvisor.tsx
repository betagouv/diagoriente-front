import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { isEmpty } from 'lodash';

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, IUser } from 'reducers';

// hooks
import { useDidUpdate } from '../../hooks';

// utils
import { decodeUri } from '../../utils/url';

// actions
import loginAdvisorActions from '../../reducers/authAdvisor/login';

// components
import LoginForm from '../../components/form/LoginForm/LoginForm';

interface DispatchToProps {
  loginRequest: (email: string, password: string) => void;
}

interface MapToProps {
  fetching: boolean;
  error: string;
  user: IUser | {};
}

type Props = RouteComponentProps & DispatchToProps & MapToProps;

const LoginUserContainer = ({ loginRequest, fetching, error, history, location, user }: Props) => {
  const onSubmit = (email: string, password: string) => {
    loginRequest(email, password);
  };

  useDidUpdate(() => {
    if (!(fetching || error)) {
      history.push('/');
    }
  },           [fetching]);

  return <LoginForm error={error} onSubmit={onSubmit} />;
};

const mapStateToProps = ({ authAdvisor }: ReduxState): MapToProps => ({
  fetching: authAdvisor.login.fetching,
  error: authAdvisor.login.error,
  user: authAdvisor.advisor,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  loginRequest: (email, password) => dispatch(loginAdvisorActions.loginAdvisorRequest({ email, password })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginUserContainer);
