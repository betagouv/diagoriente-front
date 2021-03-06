import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, IUser } from 'reducers';

// hooks
import { useDidUpdate } from 'hooks';

// actions
import loginAdvisorActions from 'reducers/authAdvisor/login';

// components
import LoginForm from 'components/form/LoginForm/LoginForm';

import classes from './login.module.scss';

interface DispatchToProps {
  loginRequest: (email: string, password: string) => void;
}

interface MapToProps {
  fetching: boolean;
  error: string;
  user: IUser | {};
}

type Props = RouteComponentProps & DispatchToProps & MapToProps;

const LoginUserContainer = ({
 loginRequest, fetching, error, history,
}: Props) => {
  const onSubmit = (email: string, password: string) => {
    loginRequest(email, password);
  };

  useDidUpdate(() => {
    if (!(fetching || error)) {
      history.push('/advisorSpace');
    }
  }, [fetching]);

  return (
    <div className={classes.login_advisor}>
      <LoginForm error={error} onSubmitForm={onSubmit} showLogin />
    </div>
  );
};

const mapStateToProps = ({ authAdvisor }: ReduxState): MapToProps => ({
  fetching: authAdvisor.login.fetching,
  error: authAdvisor.login.error,
  user: authAdvisor.advisor,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  loginRequest: (email, password) =>
    dispatch(loginAdvisorActions.loginAdvisorRequest({ email, password })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginUserContainer);
