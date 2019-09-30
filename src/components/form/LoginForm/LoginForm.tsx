import React, { MouseEvent } from 'react';

// hooks
import { useTextInput } from '../../../hooks';

// utils
import { validateEmail, validatePassword } from '../../../utils/validation';
// style
import classes from './loginForm.module.scss';

// components
import Input from '../Input/Input';
import arrow from '../../../assets_v3/icons/arrow/arrow.svg';
import MultiIcon from '../../../components_v3/icons/multiIcon/multiIcon';
import Button from 'components_v3/button/button';
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
            {/* <MultiIcon
              type="connect"
              withText
              text="se connecter"
              width="35"
              height="35"
              textColor="#7992BF"
              onClick={submit}
              Iconcolor="#7992BF"
            /> */}
            <Button title="se connecter" color="red" style={{height: 40, padding: '0px 40px', fontSize: 14 }} onClick={submit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginUserContainer;
