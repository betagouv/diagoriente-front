import React, { MouseEvent, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState } from 'reducers';

import { useTextInput, useDidUpdate, useDidMount } from '../../hooks';
import { validatePassword } from '../../utils/validation';
import updateActions from '../../reducers/authUser/updatePassword';

import Button from '../../components/buttons/RoundButton/RoundButton';
import Input from '../../components/form/Input/Input';
import classes from './reset.module.scss';

interface DispatchToProps {
  updateRequest: (password: string) => void;
}
interface IMapToProps {
  fetching: boolean;
  error: any;
  updated: boolean;
}
type IProps = DispatchToProps & IMapToProps & RouteComponentProps;
const RestPassword = ({ updateRequest, fetching, error, updated, history }: IProps) => {
  const [password, passwordChange, passwordTouched] = useTextInput('');
  const [confirmPassword, confirmPasswordChange, confirmPasswordTouched] = useTextInput('');
  const passwordValid = passwordTouched ? validatePassword(password) : '';
  const confirmPasswordValid = confirmPasswordTouched ? validatePassword(confirmPassword) : '';
  const [errorText, setErrorText] = useState('');

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confirmPassword || password === '' || confirmPassword === '') {
      return setErrorText('Verifier vos champs');
    }
    if (password === confirmPassword) {
      updateRequest(password);
    }
  };
  useDidUpdate(() => {
    if (updated) {
      history.push('/login');
    }
  });
 
  return (
    <div className={classes.container_home}>
      <div className={classes.form_container}>
        <div className={classes.container_title}>
          <span>Merci de saisie votre nouvelle mot de pass</span>
        </div>
        <div className={classes.error_input}>{error.message || errorText}</div>
        <Input
          name="Mot de passe"
          validation={passwordValid}
          onChange={passwordChange}
          className={classes.container_input}
          type="password"
        />
        <Input
          name=" Confirmer votre mot de passe"
          validation={confirmPasswordValid}
          onChange={confirmPasswordChange}
          className={classes.container_input}
          type="password"
        />
        <div className={classes.container_button}>
          <Button onClick={onSubmit}>Se Connecter</Button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ authUser }: ReduxState): IMapToProps => ({
  fetching: authUser.updatePassword.fetching,
  error: authUser.updatePassword.error,
  updated: authUser.updatePassword.updated,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  updateRequest: password => dispatch(updateActions.updateRequest({ password })),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(RestPassword));
