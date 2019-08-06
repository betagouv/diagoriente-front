import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { isEmpty } from 'lodash';
import { Redirect, match } from 'react-router-dom';

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, IUser, User } from 'reducers';

// hooks
import { useDidUpdate, useDidMount } from '../../hooks';

// utils
import { decodeUri } from '../../utils/url';

// actions
import loginUserActions from '../../reducers/authUser/login';
import modalAction from '../../reducers/modal';
import updateActions from '../../reducers/authUser/updatePassword';

// components
import ForgetForm from '../../components/form/ForgetForm/ForgetForm';
import LoginForm from '../../components/form/LoginForm/LoginForm';
import RegisterContainer from '../RegistreContainer/RegisterUser';
import classes from '*.module.css';

interface DispatchToProps {
  loginRequest: (email: string, password: string) => void;
  openModal: (children: any) => void;
  closeModal: () => void;
  toggleUpdated: () => void;
}

interface MapToProps {
  fetching: boolean;
  error: string;
  open: boolean;
  user: User;
}

type Props = RouteComponentProps & DispatchToProps & MapToProps;

const LoginUserContainer = ({
  loginRequest,
  openModal,
  closeModal,
  fetching,
  error,
  history,
  location,
  user,
  match,
}: Props) => {
  const [showLogin, setLogin] = useState<boolean>(true);
  const [showRegister, setRegister] = useState<boolean>(false);

  const onSubmit = (email: string, password: string) => {
    loginRequest(email, password);
  };

  useDidUpdate(() => {
    if (!(fetching || error)) {
      const path = decodeUri(location.search).from || '/';

      history.push(path);
    }
  }, [fetching]);

  const modalClose = () => {
    closeModal();
  };

  const onOpenModal = () => {
    openModal(<ForgetForm onCloseModal={modalClose} />);
  };

  if (!isEmpty(user)) return <Redirect to="/" />;

  const OpenCard = () => {
    if (showLogin) {
      setLogin(false);
      setRegister(true);
    }
    if (showRegister) {
      setLogin(true);
      setRegister(false);
    }
  };
  const styles = {
    forgot: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      maxWidth: '500px',
      margin: '10px 0',
      cursor: 'pointer',
      color: '#949494',
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '-webkit-fill-available',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoginForm
          error={error}
          onSubmitForm={onSubmit}
          footerComponent={(
            <span style={styles.forgot} onClick={onOpenModal}>
              Mot de passe oublié
            </span>
)}
          showLogin={showLogin}
          onClick={OpenCard}
        />
      </div>
      <RegisterContainer
        history={history}
        location={location}
        match={match}
        showRegister={showRegister}
        onClick={OpenCard}
      />
    </div>
  );
};

const mapStateToProps = ({ authUser, modal }: ReduxState): MapToProps => ({
  fetching: authUser.login.fetching,
  error: authUser.login.error,
  open: modal.open,
  user: authUser.user,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  loginRequest: (email, password) =>
    dispatch(loginUserActions.loginUserRequest({ email, password })),
  openModal: (children: any) => dispatch(modalAction.openModal({ children })),
  closeModal: () => dispatch(modalAction.closeModal()),
  toggleUpdated: () => dispatch(updateActions.toggleUpdated()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginUserContainer);
