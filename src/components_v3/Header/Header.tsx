import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, IUser, Advisor } from 'reducers';
import { connect } from 'react-redux';
import LogoutModal from 'components/modals/LogOutModal/LogoutModal';
import logo from 'assets_v3/Home/logo.svg';
import logo2 from 'assets_v3/Home/logo2.svg';
import Grid from 'components/ui/Grid/Grid';
import advisorActions from 'reducers/authAdvisor/login';

import classes from './Header.module.scss';

import ColoredLine from '../ColoredLine/ColoredLine';
import loginActions from '../../reducers/authUser/login';
import modalAction from '../../reducers/modal';
import logoutSvg from '../../assets/icons/svg/logout.svg';
import arrowHeader from '../../assets_v3/icons/header/arrowHeader.png';

interface Props {
  HeaderProfile?: boolean;
  modeAdvisor?: boolean;
}
interface IMapToProps {
  user: IUser | undefined;
  advisor: Advisor;
}
interface IDispatchToProps {
  logout: () => void;
  openModal: (children: any) => void;
  closeModal: () => void;
  logoutAdvisor: () => void;
}
type IProps = IMapToProps &
  Props &
  IDispatchToProps & {
    showLogout: boolean;
  };
const Header = ({
  HeaderProfile,
  history,
  showLogout,
  logoutAdvisor,
  modeAdvisor,
  location,
  user,
  advisor,
  openModal,
  closeModal,
  logout,
}: IProps & RouteComponentProps) => {
  const [HoverDropDown, setHover] = useState(false);
  function onNavigate() {
    if (location.pathname === '/profile/skills') {
      history.push('/profile/skills');
    } else if (location.pathname === '/') {
      history.push('/');
    } else if (location.pathname === '/faq') {
      if (user) {
        history.push('/profile/skills');
      } else {
        history.push('/');
      }
    } else {
      history.push('/profile/skills');
    }
  }
  function goToFaq() {
    history.push('/faq');
  }
  return (
    <div className={HeaderProfile ? classes.Header : classes.HeaderContainer}>
      <ColoredLine />
      <div className={classes.headerWrapperLogo}>
        <div className={classes.logoContainer} onClick={onNavigate}>
          <img src={logo} alt="logo" className={classes.logo} />
        </div>
        <div className={classes.logoContainer}>
          <img src={logo2} alt="logo" className={classes.logo2} />
        </div>
      </div>
      <span
        className={classes.faq}
        onClick={() => {
          history.push('/about');
        }}
        style={location.pathname === '/about' ? { color: '#223a7a' } : {}}
      >
        À PROPOS
      </span>
      <span
        className={classes.faq}
        onClick={goToFaq}
        style={location.pathname === '/faq' ? { color: '#223a7a' } : {}}
      >
        FAQ
      </span>

      <Grid className={classes.headerContainer} item xl={2}>
        {!advisor.advisor && !user ? (
          <button
            className={classes.logout}
            onClick={() => window.location.replace('https://admin.diagoriente.beta.gouv.fr/login')}
          >
            <span className={classes.logout_text}>CONNEXION PRO</span>
          </button>
        ) : user ? (
          <div
            className={classes.dropDownContainer}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className={classes.dropdown}>
              <div className={classes.dropDownBtn}>
                <button className={classes.nameContainer}>
                  {`${user.profile.firstName} ${user.profile.lastName}`}
                </button>
                <div className={classes.arrowContainer}>
                  <img className={classes.arrow} src={arrowHeader} alt="advisorArrow" />
                </div>
              </div>

              {HoverDropDown && (
                <div className={classes.dropdownContent}>
                  <button
                    className={classes.dropDaowElement}
                    onClick={() => history.push('/profile/edit_profile')}
                  >
                    Modifier le profil
                  </button>

                  <button className={classes.dropDaowElement} onClick={() => logout()}>
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
            {/*             <button onClick={() => logoutAdvisor()}>log Out</button>
             */}
            {' '}
          </div>
        ) : (
          advisor.advisor && (
            <div
              className={classes.dropDownContainer}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <div className={classes.dropdown}>
                <div className={classes.dropDownBtn}>
                  <button className={classes.nameContainer}>
                    {`${advisor.advisor.profile.firstName} ${advisor.advisor.profile.lastName}`}
                  </button>
                  <div className={classes.arrowContainer}>
                    <img className={classes.arrow} src={arrowHeader} alt="advisorArrow" />
                  </div>
                </div>

                {HoverDropDown && (
                  <div className={classes.dropdownContent}>
                    {/*     <button
                      className={classes.dropDaowElement}
                      onClick={() => history.push('/advisorSpace/mesGroupes')}
                    >
                      Voir Mes Groupes
                    </button> */}
                    <button
                      className={classes.dropDaowElement}
                      onClick={() => history.push('/advisorSpace/edit_profile_advisor')}
                    >
                      Modifier le profil
                    </button>

                    <button className={classes.dropDaowElement} onClick={() => logoutAdvisor()}>
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
              {/*             <button onClick={() => logoutAdvisor()}>log Out</button>
               */}
              {' '}
            </div>
          )
        )}
      </Grid>

      {/*    <div style={{ marginRight: '2%' }}>
        {showLogout && user && (
          <button className={classes.logout} onClick={onLogout}>
            <span className={classes.logout_text}>{user.profile.firstName}</span>
            <span className={classes.logout_text}>{user.profile.lastName}</span>
            <div className={classes.logout_icon_container}>
              <img className={classes.logout_icon} src={logoutSvg} alt="" />
            </div>
          </button>
        )}
      </div> */}
    </div>
  );
};
Header.defaultProps = {
  showLogout: true,
};
const mapStateToProps = ({ authUser, authAdvisor }: ReduxState) => ({
  advisor: authAdvisor.advisor,
  user: authUser.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  logout: () => dispatch(loginActions.logout()),
  openModal: (children: any) => dispatch(modalAction.openModal({ children })),
  closeModal: () => dispatch(modalAction.closeModal()),
  logoutAdvisor: () => dispatch(advisorActions.logoutAdvisor()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
