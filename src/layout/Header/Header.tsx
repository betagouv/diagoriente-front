import React from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

import loginActions from '../../reducers/authUser/login';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, User } from 'reducers';
import logo from '../../assets/icons/logo/diagoriente-logo-01.png';
import logo2x from '../../assets/icons/logo/diagoriente-logo-01@2x.png';
import logo3x from '../../assets/icons/logo/diagoriente-logo-01@3x.png';

import classes from './header.module.scss';
import classNames from '../../utils/classNames';

interface IMapToProps {
  user: User;
}

interface IDispatchToProps {
  logout: () => void;
}

type Props = IMapToProps & IDispatchToProps;

const Header = ({ logout, user }: Props) => {
  return (
    <div className={classes.headerContainer}>
      <div className={classes.logoWrapper}>
        <img
          src={logo}
          srcSet={`${logo2x} 2x, ${logo3x} 3x`}
          alt="Logo"
          className={classNames(classes.logo, 'item-12 item-xl-10 item-md-8 item-sm-6  item-xs-4') }
        />
      </div>

      {!isEmpty(user) && <button onClick={logout}>logout</button>}
    </div>
  );
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
