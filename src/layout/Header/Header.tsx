import React from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

import loginActions from '../../reducers/authUser/login';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, User } from 'reducers';

// components
import Grid from '../../components/ui/Grid/Grid';

// assets
import logo from '../../assets/icons/logo/diagoriente-logo-01.png';
import logo2x from '../../assets/icons/logo/diagoriente-logo-01@2x.png';
import logo3x from '../../assets/icons/logo/diagoriente-logo-01@3x.png';
import logoutSvg from '../../assets/icons/svg/logout.svg';

import classes from './header.module.scss';

interface IMapToProps {
  user: User;
}

interface IDispatchToProps {
  logout: () => void;
}

type Props = IMapToProps & IDispatchToProps;

const Header = ({ logout, user }: Props) => {
  return (
    <Grid className={classes.headerContainer} container>
      <Grid item xl={6}>
        <img className={classes.logo} src={logo} srcSet={`${logo2x} 2x, ${logo3x} 3x`} alt="Logo" />
      </Grid>
      <Grid className={classes.logout_container} item xl={6}>
        {!isEmpty(user) && (
          <button className={classes.logout} onClick={logout}>
            <span className={classes.logout_text}>déconnexion</span>
            <div className={classes.logout_icon_container}>
              <img className={classes.logout_icon} src={logoutSvg} />
            </div>
          </button>
        )}
      </Grid>
    </Grid>
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
