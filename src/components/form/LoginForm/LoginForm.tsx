import React, { MouseEvent, useState } from 'react';
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
import arrow from '../../../assets_v3/icons/arrow/arrow.svg';
import ButtonIcon from '../../../assets_v3/icons/svgIcons/iconButton.svg';
import RegisterUserContainer from '../../../containers/RegistreContainer/RegisterUser';
import MultiIcon from '../../../components_v3/icons/multiIcon/multiIcon';

interface Props {
  onSubmitForm: (email: string, password: string) => void;
  error?: string;
  footerComponent?: JSX.Element;
  showLogin?: boolean;
}

const LoginUserContainer = ({
  onSubmitForm,
  error,
  footerComponent,
  showLogin,
  ...other
}: Props & React.HTMLAttributes<HTMLElement>) => {
  const [email, emailChange, emailTouched] = useTextInput('');
  const [password, passwordChange, passwordTouched] = useTextInput('');

  const emailValid = emailTouched ? validateEmail(email) : '';
  const passwordValid = passwordTouched ? validatePassword(password) : '';

  const submit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmitForm(email, password);
  };

  return (
    <div className={classes.container_form}>
      <div className={classes.container_title} {...other}>
        <img className={showLogin ? classes.arrowUp : classes.arrow} src={arrow} alt="arrow" />
        <span>Se connecter</span>
      </div>
      {showLogin && (
        <div className={classes.formContainer}>
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

          {footerComponent}
          <div className={classes.container_button}>
            {/* <Button onClick={submit}>Se connecter</Button> */}
            <MultiIcon
              type="connect"
              withText
              text={'se connecter'}
              width="35"
              height="35"
              textColor="#7a93bc"
              onClick={submit}
              Iconcolor="#7a93bc"
              bottom
            />
          </div>
          {/* <div className={classes.container_forget_Password}>
          {showInscription && (
            <h5 className={classes.register_text}>
              <span>Vous ne possédez pas de compte ?</span>
              <Link to="/register">S’inscrire</Link>
            </h5>
          )}
        </div> */}
        </div>
      )}
    </div>
  );
};

export default LoginUserContainer;
