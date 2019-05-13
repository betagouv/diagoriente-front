import React, { MouseEvent, ReactElement } from 'react';
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
import modalAction from '../../reducers/modal';
import updateActions from '../../reducers/authUser/updatePassword';

// style
import classes from './login.module.scss';

// components
import Button from '../../components/buttons/RoundButton/RoundButton';
import Input from '../../components/form/Input/Input';
import ForgetForm from '../../components/ForgetForm/ForgetForm';
interface DispatchToProps {
  loginRequest: (email: string, password: string) => void;
  openModal: (children: any) => void;
  closeModal: () => void;
  toggleUpdated: () => void;
}

interface MapToProps {
  fetching: boolean;
  error: string;
  open: boolean;
}

type Props = RouteComponentProps & DispatchToProps & MapToProps;

const LoginUserContainer = ({
  loginRequest,
  toggleUpdated,
  openModal,
  closeModal,
  fetching,
  error,
  history,
  location,
  open,
}: Props) => {
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
  const onOpenModal = () => {
    openModal(<ForgetForm onCloseModal={modalClose} />);
  };
  const modalClose = () => {
    closeModal();
  };

  return (
    <div className={classes.container_home}>
      <div className={classes.container_form}>
        <div className={classes.container_title}>
          <span>Se Connecter</span>
        </div>
        <Input
          name="Email"
          validation={emailValid}
          onChange={emailChange}
          className={classes.container_input}
          type="email"
        />
        <Input
          name="Mot de passe"
          validation={passwordValid}
          onChange={passwordChange}
          className={classes.container_input}
          type="password"
        />

        <div className={classes.container_button}>
          <Button onClick={onSubmit}>Se Connecter</Button>
        </div>
        <div className={classes.container_forget_Password}>
          <h5 className={classes.register_text}>
            <span>Vous ne possédez pas un compte ?</span>
            <Link to="/register">Inscription </Link>
          </h5>
          <h6 onClick={onOpenModal}>mot de pass oublié</h6>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authUser, modal }: ReduxState): MapToProps => ({
  fetching: authUser.login.fetching,
  error: authUser.login.error,
  open: modal.open,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  loginRequest: (email, password) => dispatch(loginUserActions.loginUserRequest({ email, password })),
  openModal: (children: any) => dispatch(modalAction.openModal({ children })),
  closeModal: () => dispatch(modalAction.closeModal()),
  toggleUpdated: () => dispatch(updateActions.toggleUpdated()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginUserContainer);
