import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Dispatch, AnyAction } from 'redux';
import { ReduxState, IUser } from 'reducers';

// components
import Grid from '../../components/ui/Grid/Grid';
import LogoutModal from '../../components/modals/LogOutModal/LogoutModal';

// assets
import logo from '../../assets/icons/logo/diagoriente-logo-01.png';
import logo2x from '../../assets/icons/logo/diagoriente-logo-01@2x.png';
import logo3x from '../../assets/icons/logo/diagoriente-logo-01@3x.png';
import logoutSvg from '../../assets/icons/svg/logout.svg';

import classes from './header.module.scss';

import loginActions from '../../reducers/authUser/login';
import modalAction from '../../reducers/modal';

interface IMapToProps {
  user: IUser | undefined;
}

interface IDispatchToProps {
  logout: () => void;
  openModal: (children: any) => void;
  closeModal: () => void;
}

type Props = IMapToProps &
  IDispatchToProps & {
    showLogout: boolean;
  };

const Header = ({ logout, user, showLogout, openModal, closeModal }: Props) => {
  const onLogout = () => {
    openModal(<LogoutModal onLogout={logout} onClose={closeModal} />);
  };

  return (
    <Grid className={classes.headerContainer} container>
      <Grid item xl={6}>
        <Link to={'/'}>
          <img className={classes.logo} src={logo} srcSet={`${logo2x} 2x, ${logo3x} 3x`} alt="Logo" />
        </Link>
      </Grid>
      <Grid className={classes.logout_container} item xl={6}>
        {showLogout && user && (
          <button className={classes.logout} onClick={onLogout}>
            <span className={classes.logout_text}>
              {user.profile.firstName} {user.profile.lastName}
            </span>
            <div className={classes.logout_icon_container}>
              <img className={classes.logout_icon} src={logoutSvg} />
            </div>
          </button>
        )}
      </Grid>
    </Grid>
  );
};

Header.defaultProps = {
  showLogout: true,
};

const mapStateToProps = ({ authUser }: ReduxState) => ({
  user: authUser.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  logout: () => dispatch(loginActions.logout()),
  openModal: (children: any) => dispatch(modalAction.openModal({ children })),
  closeModal: () => dispatch(modalAction.closeModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
