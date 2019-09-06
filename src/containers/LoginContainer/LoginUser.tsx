import React from 'react';

import { isEmpty } from 'lodash';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, User } from 'reducers';

// hooks
import { useDidUpdate } from 'hooks';

// utils
import { decodeUri, encodeUri } from 'utils/url';
// actions
import loginUserActions from 'reducers/authUser/login';
import modalAction from 'reducers/modal';
import updateActions from 'reducers/authUser/updatePassword';

// components
import ForgetForm from 'components/form/ForgetForm/ForgetForm';
import LoginForm from 'components/form/LoginForm/LoginForm';
import RegisterContainer from '../RegistreContainer/RegisterUser';
import classes from './login.module.scss';

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
  const search = decodeUri(location.search);

  const onSubmit = (email: string, password: string) => {
    loginRequest(email, password);
  };

  useDidUpdate(() => {
    if (!(fetching || error)) {
       const storedTuto = localStorage.getItem('Tuto');
      if (!storedTuto) {
        localStorage.setItem(
          'Tuto',
          JSON.stringify([false, false, false, false, false, false, false, false, false, false]),
        );
      }

      const path = search.from || '/';

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
    if (search.register) {
      const newSearch = { ...search };
      delete newSearch.register;
      history.replace(location.pathname + encodeUri(newSearch));
    } else {
      history.replace(location.pathname + encodeUri({ ...search, register: true }));
    }
  };

  return (
    <div className={classes.container}>
      <div className="flex_center">
        <LoginForm
          error={error}
          onSubmitForm={onSubmit}
          footerComponent={(
            <span className={classes.forgot} onClick={onOpenModal}>
              Mot de passe oublié
            </span>
)}
          showLogin={!search.register}
          onClick={OpenCard}
        />
      </div>
      <RegisterContainer
        history={history}
        location={location}
        match={match}
        showRegister={!!search.register}
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
