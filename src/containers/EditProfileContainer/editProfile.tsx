import React, { useState } from 'react';
import Header from 'components_v3/Header/Header';
import { RouteComponentProps } from 'react-router-dom';
import Input from 'components/form/Input/Input';
import { useTextInput } from 'hooks/useInputs';
import { validateEmail, validatePassword, validateNom } from 'utils/validation';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import {
 ReduxState, User, IToken, IAdvisor, Advisor,
} from 'reducers';
import { useDidMount } from 'hooks/useLifeCycle';
import { listQuestions, patchUser, patchAdvisor } from 'requests';
import { map } from 'lodash';
import { useSelectInput } from 'hooks/useSelect';
import Button from 'components_v3/button/button';
import userActions from 'reducers/authUser/user';
import advisorActions from 'reducers/authAdvisor/advisor';
import { setItem } from 'utils/localforage';
import withApi, { ApiComponentProps } from '../../hoc/withApi';
import Select from '../../components/form/Select/select';
import classes from './editProfile.module.scss';

interface MapToProps {
  user: User;
  token: IToken | undefined;
  advisor: Advisor;
  advisorToken: IToken | undefined;
}
interface DispatchToProps {
  setUserState: (apiUser: { token: {}; user: {} }) => void;
  setAdvisorState: (apiAdvisor: { token: {}; advisor: {} }) => void;
}

type Props = ApiComponentProps<{ list: typeof listQuestions }> &
  RouteComponentProps &
  MapToProps &
  DispatchToProps;

const Editprofile = ({
  user,
  list,
  setUserState,
  token,
  advisor,
  advisorToken,
  setAdvisorState,
  location,
}: Props) => {
  useDidMount(() => {
    list.call();
  });

  const { data } = list;
  const [email, emailChange, emailTouched] = useTextInput(
    user.user ? user.user.email : advisor.advisor ? advisor.advisor.email : '',
  );
  const [password, passwordChange, passwordTouched] = useTextInput('');
  const [OldPassword, OldpasswordChange, OldpasswordTouched] = useTextInput('');
  const [firstName, firstNameChange, firstNameTouched] = useTextInput(
    location.pathname === '/edit_profile'
      ? user.user ? user.user.profile.firstName : ''
      : location.pathname === '/edit_profile_advisor'
      ? advisor.advisor
        ? advisor.advisor.profile.firstName
        : ''
      : '',
  );
  const [lastName, lastNameChange, lastNameTouched] = useTextInput(
    location.pathname === '/edit_profile'
      ? user.user ? user.user.profile.lastName : ''
      : location.pathname === '/edit_profile_advisor'
      ? advisor.advisor
        ? advisor.advisor.profile.lastName
        : ''
      : '',
  );
  const [institution, setInstitution, InstitutionTouched] = useTextInput(
    advisor.advisor ? advisor.advisor.profile.institution : '',
  );

  const InstitutionValid = InstitutionTouched ? validateNom(institution) : '';
  const emailValid = emailTouched ? validateEmail(email) : '';
  const passwordValid = passwordTouched ? validatePassword(password) : '';
  const OldpasswordValid = OldpasswordTouched ? validatePassword(OldPassword) : '';
  const firstNameValid = firstNameTouched ? validateNom(firstName) : '';
  const lastNameValid = lastNameTouched ? validateNom(lastName) : '';
  const [questionValue, open, onChange, onOpen, onClose] = useSelectInput('');
  const [response, responseChange, responseTouched] = useTextInput('');
  const responseValid = responseTouched ? validateNom(response) : '';
  const [apiUser, setUser] = useState();

  const validate = () => {
      if (location.pathname === '/edit_profile') {
          if (user.user) {
            const question: any = {
              response,
              _id: questionValue,
            };
            patchUser(
              {
                firstName,
                lastName,
                OldPassword,
                password,
                question,
              },
              user.user._id,
            ).then(item => {
              setUser(item.data);
              setUserState(item.data);
              const userStorage = { user: item.data, token };
              // console.log(userStorage);
              setItem('user', userStorage);
            });
          }
      } else if (location.pathname === '/edit_profile_advisor') {

          if (advisor) {
            patchAdvisor(
              {
                firstName,
                lastName,
                OldPassword,
                password,
                email,
                institution,
              },
              advisor.advisor ? advisor.advisor._id : '',
            ).then(item => {
              setAdvisorState(item.data);
              const token = advisorToken
              const advisorStorage = { advisor: item.data, token };
              setItem('advisor', advisorStorage);
            });
          }
      }
  };

  return (
    <div className={classes.container}>
      <Header showLogout />
      <div className={classes.body}>
        <div className={classes.tilteWrapper}>
          <span className={classes.title}>Modifier mon profil</span>
        </div>
        <div className={classes.userForm}>
          <Input
            name="Prénom"
            validation={firstNameValid}
            onChange={firstNameChange}
            className={classes.container_input}
            value={firstName}
          />
          <Input
            name="Nom"
            validation={lastNameValid}
            onChange={lastNameChange}
            className={classes.container_input}
            value={lastName}
          />
          <Input
            name="Email"
            validation={emailValid}
            onChange={emailChange}
            className={classes.container_input}
            email
            value={email}
          />
          <Input
            name="Ancien Mot de passe"
            validation={OldpasswordValid}
            onChange={OldpasswordChange}
            className={classes.container_input}
            type="password"
          />
          <Input
            name="Nouveau Mot de passe"
            validation={passwordValid}
            onChange={passwordChange}
            className={classes.container_input}
            type="password"
          />
          {location.pathname === '/edit_profile_advisor' && (
            <Input
              name="Institution"
              validation={InstitutionValid}
              onChange={setInstitution}
              className={classes.container_input}
              value={institution}
            />
          )}
          {location.pathname === '/edit_profile' && (
            <React.Fragment>
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
              <Input
                name="Votre réponse à la question de sécurité"
                validation={responseValid}
                onChange={responseChange}
                className={classes.container_input}
              />
            </React.Fragment>
          )}

          <div className={classes.btnContainer}>
            <Button
              title="valider"
              color="red"
              onClick={validate}
              style={{ width: 150, height: 35 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authUser, authAdvisor }: ReduxState): MapToProps => ({
  user: authUser.user,
  token: authUser.user.token,
  advisor: authAdvisor.advisor,
  advisorToken: authAdvisor.advisor.token,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  setUserState: (apiUser: any) => dispatch(userActions.userUpdate({ user: apiUser })),
  setAdvisorState: (apiAdvisor: any) =>
    dispatch(advisorActions.advisorUpdate({ advisor: apiAdvisor })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApi({ list: listQuestions })(Editprofile));
