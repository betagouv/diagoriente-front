import React from 'react';
import { RouteComponentProps } from 'react-router';
import { isEmpty } from 'lodash';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, IUser, User } from 'reducers';

// hooks
import { useDidUpdate } from '../../hooks';

// utils
import { decodeUri } from '../../utils/url';

// actions
import loginUserActions from '../../reducers/authUser/login';
import modalAction from '../../reducers/modal';
import updateActions from '../../reducers/authUser/updatePassword';

// components
import ForgetForm from '../../components/form/ForgetForm/ForgetForm';
import LoginForm from '../../components/form/LoginForm/LoginForm';

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
}: Props) => {
  const onSubmit = (email: string, password: string) => {
    loginRequest(email, password);
  };

  useDidUpdate(() => {
    if (!(fetching || error)) {
      const path = decodeUri(location.search).from || '/';

      history.push(path);
    }
  },           [fetching]);

  const onOpenModal = () => {
    openModal(<ForgetForm onCloseModal={modalClose} />);
  };
  const modalClose = () => {
    closeModal();
  };

  if (!isEmpty(user)) return <Redirect to={'/'} />;

  return <LoginForm error={error} onSubmit={onSubmit} footerComponent={<h6 onClick={onOpenModal}>mot de passe oublié</h6>} />;
};

const mapStateToProps = ({ authUser, modal }: ReduxState): MapToProps => ({
  fetching: authUser.login.fetching,
  error: authUser.login.error,
  open: modal.open,
  user: authUser.user,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  loginRequest: (email, password) => dispatch(loginUserActions.loginUserRequest({ email, password })),
  openModal: (children: any) => dispatch(modalAction.openModal({ children })),
  closeModal: () => dispatch(modalAction.closeModal()),
  toggleUpdated: () => dispatch(updateActions.toggleUpdated()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginUserContainer);
