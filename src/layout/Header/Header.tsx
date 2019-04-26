import React from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

import loginActions from '../../reducers/authUser/login';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, User } from 'reducers';

import classes from './header.module.scss';

interface IMapToProps {
  user: User;
}

interface IDispatchToProps {
  logout: () => void;
}

type Props = IMapToProps & IDispatchToProps;

const Header = ({ logout, user }: Props) => {
  return <div>{!isEmpty(user) && <button onClick={logout}>logout</button>}</div>;
};

const mapStateToProps = ({ authUser }: ReduxState) => ({
  user: authUser.user,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  logout: () => dispatch(loginActions.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
