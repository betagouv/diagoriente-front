import React, { MouseEvent } from 'react';
import { map } from 'lodash';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState } from 'reducers';
import arrow from '../../assets_v3/icons/arrow/arrow.svg';

// hooks
import {
 useTextInput, useDidUpdate, useDidMount, useSelectInput,
} from '../../hooks';

// utils
import { validateEmail, validatePassword, validateNom } from '../../utils/validation';

// Api
import withApi, { ApiComponentProps } from '../../hoc/withApi';
import { listQuestions } from '../../requests/question';

// actions
import registerUserActions from '../../reducers/authUser/register';

// style
import classes from './register.module.scss';

// components
import Input from '../../components/form/Input/Input';
import Select from '../../components/form/Select/select';

import Grid from '../../components/ui/Grid/Grid';
import MultiIcon from '../../components_v3/icons/multiIcon/multiIcon';

interface DispatchToProps {
  registerRequest: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    question: {
      _id: string;
      response: string;
    },
  ) => void;
}

interface MapToProps {
  fetching: boolean;
  error: string;
}
interface Show {
  showRegister: boolean;
}

type Props = RouteComponentProps &
  ApiComponentProps<{ list: typeof listQuestions }> &
  DispatchToProps &
  MapToProps &
  Show;

const RegisterUserContainer = ({
  list,
  registerRequest,
  fetching,
  error,
  history,
  showRegister,
  ...other
}: Props & React.HTMLAttributes<HTMLElement>) => {
  useDidMount(() => {
    list.call();
  });
  const { data } = list;
  const [email, emailChange, emailTouched] = useTextInput('');
  const [password, passwordChange, passwordTouched] = useTextInput('');
  const [firstName, firstNameChange, firstNameTouched] = useTextInput('');
  const [response, responseChange, responseTouched] = useTextInput('');
  const [lastName, lastNameChange, lastNameTouched] = useTextInput('');
  const [questionValue, open, onChange, onOpen, onClose] = useSelectInput('');

  const emailValid = emailTouched ? validateEmail(email) : '';
  const passwordValid = passwordTouched ? validatePassword(password) : '';
  const firstNameValid = firstNameTouched ? validateNom(firstName) : '';
  const lastNameValid = lastNameTouched ? validateNom(lastName) : '';
  const responseValid = responseTouched ? validateNom(response) : '';
  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const question: any = {
      response,
      _id: questionValue,
    };
    registerRequest(email, password, firstName, lastName, question);
  };
  useDidUpdate(() => {
    if (!(fetching || error)) {
      const path = '/profile';

      history.push(path);
    }
  }, [fetching]);

  return (
    <div className={classes.container_home}>
      <div className={classes.container_form}>
        <div className={classes.container_title} {...other}>
          <img className={showRegister ? classes.arrowUp : classes.arrow} src={arrow} alt="arrow" />
          <span>Inscription</span>
        </div>
        {showRegister && (
          <div className={classes.formContainer}>
            <span className={classes.error}>{error}</span>
            <div className={classes.container_select}>
              <Grid item xl={5} md={12}>
                <Input
                  name="Prénom"
                  validation={firstNameValid}
                  onChange={firstNameChange}
                  className={classes.container_input}
                />
              </Grid>
              <Grid item xl={5} md={12}>
                <Input
                  name="Nom"
                  validation={lastNameValid}
                  onChange={lastNameChange}
                  className={classes.container_input}
                />
              </Grid>
            </div>
            <div className={classes.columnWrapper}>
              <div className={classes.container_select}>
                <Grid item xl={12} md={12}>
                  <Input
                    name="Email  "
                    validation={emailValid}
                    onChange={emailChange}
                    className={classes.container_input}
                    email
                  />
                </Grid>
              </div>
              <div className={classes.container_select}>
                <Grid item xl={12} md={12}>
                  <Input
                    name="Mot de passe"
                    validation={passwordValid}
                    onChange={passwordChange}
                    className={classes.container_input}
                    type="password"
                  />
                </Grid>
              </div>
              <div className={classes.container_select}>
                <Grid item xl={12} md={12}>
                  <Select
                    options={map(data, question => ({
                      value: question._id,
                      label: question.title,
                    }))}
                    open={open}
                    onChange={onChange}
                    value={questionValue}
                    className={classes.container_input_select}
                    placeholder="Questions de sécurité"
                    selectOpen={onOpen}
                    selectClose={onClose}
                  />
                </Grid>
              </div>
              <div className={classes.container_select}>
                <Grid item xl={12} md={12}>
                  <Input
                    name="Votre réponse à la question de sécurité"
                    validation={responseValid}
                    onChange={responseChange}
                    className={classes.container_input}
                  />
                </Grid>
              </div>
            </div>

            <div className={classes.container_button}>
              <MultiIcon
                type="connect"
                withText
                text="S’INSCRIRE"
                width="35"
                height="35"
                textColor="#7a93bc"
                onClick={onSubmit}
                Iconcolor="#7a93bc"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authUser }: ReduxState): MapToProps => ({
  fetching: authUser.register.fetching,
  error: authUser.register.error,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  registerRequest: (email, password, firstName, lastName, question) =>
    dispatch(
      registerUserActions.registerUserRequest({
        email,
        password,
        firstName,
        lastName,
        question,
      }),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApi({ list: listQuestions })(RegisterUserContainer));
