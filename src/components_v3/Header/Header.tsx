import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, IUser } from 'reducers';
import { connect } from 'react-redux';
import LogoutModal from 'components/modals/LogOutModal/LogoutModal';
import classes from './Header.module.scss';
import logo from '../../assets/icons/logo/Diagoriente_Logo.svg';
import ColoredLine from '../ColoredLine/ColoredLine';
import loginActions from '../../reducers/authUser/login';
import modalAction from '../../reducers/modal';
import logoutSvg from '../../assets/icons/svg/logout.svg';

interface Props {
  HeaderProfile?: boolean;
}
interface IMapToProps {
  user: IUser | undefined;
}
interface IDispatchToProps {
  logout: () => void;
  openModal: (children: any) => void;
  closeModal: () => void;
}
type IProps = IMapToProps &Props&
  IDispatchToProps & {
    showLogout: boolean;
  };
const Header = ({
  HeaderProfile,
   history,
   showLogout,
   location,
   user,
   openModal,
   closeModal,
   logout,
}: IProps & RouteComponentProps) => {
  function onNavigate() {
    if (location.pathname === '/profile/skills') {
      history.push('/');
    } else if (location.pathname === '/') {
      history.push('/');
    } else {
      history.push('/profile/skills');
    }
  }
  const onLogout = () => {
    openModal(<LogoutModal onLogout={logout} onClose={closeModal} />);
  }
  return (
    <div className={HeaderProfile ? classes.Header : classes.HeaderContainer}>
      <ColoredLine />
      <div className={classes.logoContainer} onClick={onNavigate}>
        <img src={logo} alt="logo" className={classes.logo} />
      </div>
      <div>
        {showLogout && user && (
          <button className={classes.logout} onClick={onLogout}>
            <span className={classes.logout_text}>
              {user.profile.firstName}
              {user.profile.lastName}
            </span>
            <div className={classes.logout_icon_container}>
              <img className={classes.logout_icon} src={logoutSvg} alt="" />
            </div>
          </button>
        )}
      </div>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
