import React, { MouseEvent, useState } from 'react';
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
  const [conditionChecked, setChecked] = useState(false);
  const [conditionValidation, changeConditionValidation] = useState(false);

  const emailValid = emailTouched ? validateEmail(email) : '';
  const passwordValid = passwordTouched ? validatePassword(password) : '';
  const firstNameValid = firstNameTouched ? validateNom(firstName) : '';
  const lastNameValid = lastNameTouched ? validateNom(lastName) : '';
  const responseValid = responseTouched ? validateNom(response) : '';
  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (conditionChecked) {
      const question: any = {
        response,
        _id: questionValue,
      };
      registerRequest(email, password, firstName, lastName, question);
    } else {
      changeConditionValidation(true);
    }
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
              {conditionValidation && (
                <span style={{ fontSize: '11px', color: 'red' }}>
                  Vous devez accepter les conditions d’utilisation de Pix pour créer un compte.
                </span>
              )}
              <div className={classes.container_select} style={{ margin: '15px 0 0 15px' }}>
                <Grid item xl={12} md={12} style={{ display: 'flex' }}>
                  <input
                    type="checkbox"
                    name="vehicle2"
                    value="Car"
                    checked={conditionChecked}
                    onChange={() => {
                      setChecked(!conditionChecked);
                      changeConditionValidation(false);
                    }}
                  />
                  <span style={{ margin: '-1px 0.5ex' }}>
                    j&apos;accepte les conditions d&apos;utilisation de Diagoriente
                  </span>
                  <br />
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
            <span style={{ margin: '4px 29px 23px 29px', fontSize: '11px', lineHeight: '1rem' }}>
              Les informations recueillies sur ce formulaire sont enregistrées dans un fichier
              informatisé par Pix pour permettre l&apos;accès au service offert par Pix. Elles sont
              conservées pendant une durée de 5 ans maximum à compter du dernier accès au compte
              utilisateur, et archivées selon les délais de prescription légale (5 ans). Elles sont
              destinées à Pix et à ses prestataires techniques exclusivement. Conformément à la loi
              « informatique et libertés », vous pouvez exercer votre droit d&apos;accès aux données
              vous concernant et les faire rectifier en envoyant un mail à
              pascal.chaumette@beta.gouv.fr
            </span>
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
