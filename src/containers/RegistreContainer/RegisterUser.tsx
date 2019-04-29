import React, { MouseEvent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, IQuestion } from 'reducers';

// hooks
import { useTextInput, useDidUpdate, useDidMount } from '../../hooks';

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

interface DispatchToProps {
  registerRequest: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    institution: string,
    question: {
      _id: string;
      response: string
    },
  ) => void;
};

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
  const [Question, setQuestion] = useState();
  const [questionSelected, setQuestionSelected] = useState('Choisi un question de sécurité');
  const [open, setOpen] = useState(false);

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
      _id: Question._id,
    }
    registerRequest(email, password, firstName, lastName, institution, question);
  };

  const selectQuestion = (Question: IQuestion) => {
    setQuestion(Question);
    setQuestionSelected(Question.title);
  }

  const selectOpen = () => {
    setOpen(true);
  }
  const selectClose = () => {
    setOpen(false);
  }
  useDidUpdate(() => {
    if (!(fetching || error)) {
      const path = decodeUri(location.search).from || '/';
      history.push(path)
    }
  }
    , [fetching]);
  return (
    <div className={classes.container_home}>
      <div className={classes.container_form}>
        <div className={classes.container_title}>
          <h3>Sign Up</h3>
        </div>
        <Input
          name="First name"
          validation={firstNameValid}
          onChange={firstNameChange}
          className={classes.container_input}
        />
        <Input
          name="Last name"
          validation={lastNameValid}
          onChange={lastNameChange}
          className={classes.container_input}
        />
        <Input
          name="Email"
          validation={emailValid}
          onChange={emailChange}
          className={classes.container_input}
        />
        <Input
          name="Password"
          validation={passwordValid}
          onChange={passwordChange}
          className={classes.container_input}
        />
        <Input
          name="Institution"
          validation={institutionValid}
          onChange={institutionChange}
          className={classes.container_input}
        />

        <Select
          options={data}
          open={open}
          selectOpen={selectOpen}
          selectClose={selectClose}
          onChange={selectQuestion}
          value={questionSelected}
          className={classes.container_input}

        />
        <Input
          name="Votre réponse"
          validation={responseValid}
          onChange={responseChange}
          className={classes.container_input}
        />

        <div className={classes.container_button}>
          {/*  <input disabled={!!(emailValid || passwordValid)} type="submit" onClick={onSubmit} /> */}
          <Button onClick={onSubmit}> Sign in</Button >
        </div>
        <div className={classes.container_forget_Password}>
          <h5>have an account ?<Link to="/login"> Sign in now </Link></h5>
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
  registerRequest: (email, password, firstName, lastName, institution, question) => dispatch(registerUserActions.registerUserRequest({ email, password, firstName, lastName, institution, question })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApi({ list: listQuestions })(RegisterUserContainer));
