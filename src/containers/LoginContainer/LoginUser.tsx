import React, { MouseEvent, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState } from 'reducers';

// hooks
import { useTextInput, useDidUpdate, useDidMount } from '../../hooks';

// utils
import { validateEmail, validatePassword } from '../../utils/validation';
import { decodeUri } from '../../utils/url';

// actions
import loginUserActions from '../../reducers/authUser/login';

// style
import classes from './login.module.scss';

// components
import Button from '../../components/buttons/RoundButton/RoundButton';
import Input from '../../components/form/Input/Input';

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

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
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
    <div className={classes.container_home}>
      <div className={classes.container_form}>
        <div className={classes.container_title}>
          <h3>Sign In</h3>
        </div>
        <Input name="Email" validation={emailValid} onChange={emailChange} className={classes.container_input} />
        <Input
          name="Password"
          validation={passwordValid}
          onChange={passwordChange}
          className={classes.container_input}
        />

        <div className={classes.container_button}>
          {/*  <input disabled={!!(emailValid || passwordValid)} type="submit" onClick={onSubmit} /> */}
          <Button onClick={onSubmit}> login</Button>
        </div>
        <div className={classes.container_forget_Password}>
          <h5>
            Not a member ? <Link to="/register"> Sign up now </Link>
          </h5>
        </div>
      </div>
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
