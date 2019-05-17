import React, { MouseEvent, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Grid from '../../ui/Grid/Grid';

import { map } from 'lodash';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import { useTextInput, useDidMount, useSelectInput, useDidUpdate } from '../../../hooks';
import { validateEmail, validateNom } from '../../../utils/validation';
import { ReduxState } from 'reducers';
import withApi, { ApiComponentProps } from '../../../hoc/withApi';
import { listQuestions } from '../../../requests/question';

import resetActions from '../../../reducers/authUser/resetPassword';
import Spinner from '../../ui/Spinner/Spinner';
import Input from '../Input/Input';
import Button from '../../buttons/RoundButton/RoundButton';
import logo from '../../../assets/icons/logo/diagoriente-logo-01.png';
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
}
type IProps = Props &
  DispatchToProps &
  IMapToProps &
  RouteComponentProps &
  ApiComponentProps<{ list: typeof listQuestions }>;

const ForgetForm = ({ onCloseModal, list, resetRequest, fetching, dataReset, history }: IProps) => {
  useDidMount(() => {
    list.call();
  });
  const { data } = list;
  const [email, emailChange, emailTouched] = useTextInput('');
  const emailValid = emailTouched ? validateEmail(email) : '';
  const [reponse, reponseChange, reponseTouched] = useTextInput('');
  const reponseValid = reponseTouched ? validateNom(reponse) : '';
  const [questionValue, open, onChange, onOpen, onClose] = useSelectInput('');

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
    <div className={classes.wrapperModal}>
      <div className={classes.container}>
        <Grid container padding={{ xl: 0 }} spacing={{ xl: 0 }}>
          <Grid item xl={12} className={classes.header}>
            <img className={classes.logo} src={logo} alt="Logo" />
            <button onClick={onCloseModal}>Fermer</button>
          </Grid>
          <Grid container padding={{ xl: 30 }} spacing={{ xl: 0 }}>
            <Grid item xl={12}>
              <div className={classes.title}>
              </div>
            </Grid>
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

            <Grid item xl={12} className={classes.container_button}>
              <Button onClick={onSubmit}>Envoyer</Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
const mapStateToProps = ({ authUser }: ReduxState): IMapToProps => ({
  dataReset: authUser.resetPassword.data,
  fetching: authUser.resetPassword.fetching,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  resetRequest: (email, question) => dispatch(resetActions.resetRequest({ email, question })),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withApi({ list: listQuestions })(ForgetForm)));
