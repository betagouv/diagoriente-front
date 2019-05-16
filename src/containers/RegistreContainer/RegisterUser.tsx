import React, { MouseEvent } from 'react';
import { map } from 'lodash';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState } from 'reducers';

// hooks
import { useTextInput, useDidUpdate, useDidMount, useSelectInput } from '../../hooks';

// utils
import { validateEmail, validatePassword, validateNom } from '../../utils/validation';
import { decodeUri } from '../../utils/url';

// Api
import withApi, { ApiComponentProps } from '../../hoc/withApi';
import { listQuestions } from '../../requests/question';

// actions
import registerUserActions from '../../reducers/authUser/register';

// style
import classes from './register.module.scss';

// components
import Button from '../../components/buttons/RoundButton/RoundButton';
import Input from '../../components/form/Input/Input';
import Select from '../../components/form/Select/select';
import Grid from '../../components/ui/Grid/Grid';

interface DispatchToProps {
  registerRequest: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    institution: string,
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

type Props = RouteComponentProps & ApiComponentProps<{ list: typeof listQuestions }> & DispatchToProps & MapToProps;

const RegisterUserContainer = ({ list, registerRequest, fetching, error, history, location }: Props) => {
  useDidMount(() => {
    list.call();
  });
  const { data } = list;
  const [email, emailChange, emailTouched] = useTextInput('');
  const [password, passwordChange, passwordTouched] = useTextInput('');
  const [institution, institutionChange, institutionTouched] = useTextInput('');
  const [firstName, firstNameChange, firstNameTouched] = useTextInput('');
  const [response, responseChange, responseTouched] = useTextInput('');
  const [lastName, lastNameChange, lastNameTouched] = useTextInput('');
  const [questionValue, open, onChange, onOpen, onClose] = useSelectInput('');

  const emailValid = emailTouched ? validateEmail(email) : '';
  const passwordValid = passwordTouched ? validatePassword(password) : '';
  const institutionValid = institutionTouched ? validateNom(institution) : '';
  const firstNameValid = firstNameTouched ? validateNom(firstName) : '';
  const lastNameValid = lastNameTouched ? validateNom(lastName) : '';
  const responseValid = responseTouched ? validateNom(response) : '';

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const question: any = {
      response,
      _id: questionValue,
    };
    registerRequest(email, password, firstName, lastName, institution, question);
  };

  return (
    <div className={classes.container_home}>
      <div className={classes.container_form}>
        <div className={classes.container_title}>
          <h3>Inscription</h3>
        </div>

        <Grid container spacing={{ xl: 20, md: 0 }} padding={{ xl: 40 }}>
          <Grid item xl={6} md={12}>
            <Input
              name="Prénom"
              validation={firstNameValid}
              onChange={firstNameChange}
              className={classes.container_input}
            />
          </Grid>
          <Grid item xl={6} md={12}>
            <Input
              name="Nom"
              validation={lastNameValid}
              onChange={lastNameChange}
              className={classes.container_input}
            />
          </Grid>

          <Grid item xl={6} md={12}>
            <Input name="Email" validation={emailValid} onChange={emailChange} className={classes.container_input} />
          </Grid>

          <Grid item xl={6} md={12}>
            <Input
              name="Mot de passe"
              validation={passwordValid}
              onChange={passwordChange}
              className={classes.container_input}
              type="password"
            />
          </Grid>
          <Grid item xl={6} md={12}>
            <Input
              name="Localisation"
              validation={institutionValid}
              onChange={institutionChange}
              className={classes.container_input}
            />
          </Grid>
          <Grid item xl={6} md={12}>
            <Select
              options={map(data, question => ({ value: question._id, label: question.title }))}
              open={open}
              onChange={onChange}
              value={questionValue}
              className={classes.container_input_select}
              placeholder="Questions de sécurité"
              selectOpen={onOpen}
              selectClose={onClose}
            />
          </Grid>
          <Grid item xl={6} md={12}>
            <Input
              name="Votre réponse"
              validation={responseValid}
              onChange={responseChange}
              className={classes.container_input}
            />
          </Grid>
        </Grid>

        <div className={classes.container_button}>
          <Button onClick={onSubmit}> Inscription</Button>
        </div>

        <div>
          <span className={classes.error}>{error}</span>
        </div>
        <div className={classes.container_forget_Password}>
          <h5>Vous avez un Compte ?</h5>{' '}
          <Link to="/login">
            <h6>Se Connecter</h6>{' '}
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authUser }: ReduxState): MapToProps => ({
  fetching: authUser.register.fetching,
  error: authUser.register.error,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  registerRequest: (email, password, firstName, lastName, institution, question) =>
    dispatch(registerUserActions.registerUserRequest({ email, password, firstName, lastName, institution, question })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApi({ list: listQuestions })(RegisterUserContainer));
