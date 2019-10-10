import React, { MouseEvent, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { map } from 'lodash';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import {
 useTextInput, useDidMount, useSelectInput, useDidUpdate,
} from 'hooks';
import { validateEmail, validateNom } from 'utils/validation';
import { ReduxState } from 'reducers';
import withApi, { ApiComponentProps } from 'hoc/withApi';
import { listQuestions } from 'requests/question';

import resetActions from 'reducers/authUser/resetPassword';
import Input from '../Input/Input';
import Button from 'components_v3/button/button';
import Grid from '../../ui/Grid/Grid';
import Select from '../Select/select';
import classes from './forget.module.scss';

interface Props {
  onCloseModal: () => void;
}
interface DispatchToProps {
  resetRequest: (
    email: string,
    question: {
      _id: string;
      response: string;
    },
  ) => void;
}
interface IMapToProps {
  dataReset: any;
  fetching: boolean;
  error: any;
}
type IProps = Props &
  DispatchToProps &
  IMapToProps &
  RouteComponentProps &
  ApiComponentProps<{ list: typeof listQuestions }>;

const ForgetForm = ({
 onCloseModal, list, resetRequest, dataReset, history, error,
}: IProps) => {
  useDidMount(() => {
    list.call();
  });
  const { data } = list;
  const [email, emailChange, emailTouched] = useTextInput('');
  const emailValid = emailTouched ? validateEmail(email) : '';
  const [reponse, reponseChange, reponseTouched] = useTextInput('');
  const reponseValid = reponseTouched ? validateNom(reponse) : '';
  const [questionValue, open, onChange, onOpen, onClose] = useSelectInput('');
  const [errorText, setErrorText] = useState('');

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email === '' || reponse === '' || questionValue === '') {
      return setErrorText('Verifier vos champs');
    }
    const question: any = {
      response: reponse,
      _id: questionValue,
    };
    resetRequest(email, question);
  };
  useDidUpdate(() => {
    if (dataReset.email && dataReset.token) {
      onCloseModal();
      history.push('/login/renewPassword');
    }
  });
  return (
    <div className={classes.container_home}>
      <div className={classes.form_container}>
        <div className={classes.container_title}>
          <span>Merci de saisie votre email et question secret</span>
        </div>
        <div className={classes.error_input}>{error.message || errorText}</div>
        <Grid container>
          <Grid item xl={12}>
            <Input
              name="Email"
              validation={emailValid}
              onChange={emailChange}
              type="email"
              className={classes.container_input}
            />
          </Grid>
          <Grid item xl={12}>
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
          <Grid item xl={12}>
            <Input
              name="Réponse"
              validation={reponseValid}
              onChange={reponseChange}
              className={classes.container_input}
            />
          </Grid>

          <div className={classes.container_button}>
          <Button title="Envoyer" color="red" style={{height: 40, padding: '0px 40px', fontSize: 14 }} onClick={onSubmit} />

          </div>
        </Grid>
      </div>
    </div>
  );
};
const mapStateToProps = ({ authUser }: ReduxState): IMapToProps => ({
  dataReset: authUser.resetPassword.data,
  fetching: authUser.resetPassword.fetching,
  error: authUser.resetPassword.error,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  resetRequest: (email, question) => dispatch(resetActions.resetRequest({ email, question })),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withApi({ list: listQuestions })(ForgetForm)));
