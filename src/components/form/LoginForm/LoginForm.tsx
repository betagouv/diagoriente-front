import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

// hooks
import { useTextInput } from '../../../hooks';

// utils
import { validateEmail, validatePassword } from '../../../utils/validation';

// style
import classes from './loginForm.module.scss';

// components
import Button from '../../buttons/RoundButton/RoundButton';
import Input from '../Input/Input';

interface Props {
  onSubmit: (email: string, password: string) => void;
  error?: string;
  footerComponent?: JSX.Element;
}

const LoginUserContainer = ({ onSubmit, error, footerComponent }: Props) => {
  const [email, emailChange, emailTouched] = useTextInput('');
  const [password, passwordChange, passwordTouched] = useTextInput('');

  const emailValid = emailTouched ? validateEmail(email) : '';
  const passwordValid = passwordTouched ? validatePassword(password) : '';

  const submit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className={classes.container_home}>
      <div className={classes.container_form}>
        <div className={classes.container_title}>
          <span>Se Connecter</span>
        </div>
        <span className={classes.error}>{error}</span>
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
          <Button onClick={submit}>Se Connecter</Button>
        </div>
        <div className={classes.container_forget_Password}>
          <h5 className={classes.register_text}>
            <span>Vous ne possédez pas un compte ?</span>
            <Link to="/register">Inscription </Link>
          </h5>
          {footerComponent}
        </div>
      </div>
    </div>
  );
};

export default LoginUserContainer;
