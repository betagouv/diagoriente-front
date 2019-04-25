import React, { MouseEvent, useEffect } from 'react';
import { connect } from 'react-redux';

import loginUserActions from '../../reducers/authUser/login';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState } from 'reducers';
import { useTextInput, useDidUpdate, useDidMount } from '../../hooks';
import { validateEmail, validatePassword } from '../../utils/validation';
import { RouteComponentProps } from 'react-router';

import { decodeUri } from '../../utils/url';

interface DispatchToProps {
  loginRequest: (email: string, password: string) => void;
}

interface MapToProps {
  fetching: boolean;
  error: string;
}

type Props = RouteComponentProps & DispatchToProps & MapToProps;

const LoginUserContainer = ({ loginRequest, fetching, error, history, location }: Props) => {
  const [email, emailChange, emailTouched] = useTextInput('');
  const [password, passwordChange, passwordTouched] = useTextInput('');

  const emailValid = emailTouched ? validateEmail(email) : '';
  const passwordValid = passwordTouched ? validatePassword(password) : '';

  const onSubmit = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    loginRequest(email, password);
  };

  useDidUpdate(() => {
    if (!(fetching || error)) {
      const path = decodeUri(location.search).from || '/';

      history.push(path);
    }
  },           [fetching]);

  return (
    <div>
      <div>
        <input value={email} onChange={emailChange} />
        <span>{emailValid}</span>
      </div>
      <div>
        <input value={password} onChange={passwordChange} />
        <span>{passwordValid}</span>
      </div>
      <input disabled={!!(emailValid || passwordValid)} type="submit" onClick={onSubmit} />
    </div>
  );
};

const mapStateToProps = ({ authUser }: ReduxState): MapToProps => ({
  fetching: authUser.login.fetching,
  error: authUser.login.error,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  loginRequest: (email, password) => dispatch(loginUserActions.loginUserRequest({ email, password })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginUserContainer);
