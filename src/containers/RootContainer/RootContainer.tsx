import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import {
 Switch, Route, RouteComponentProps, matchPath,
} from 'react-router-dom';

// types
import { AnyAction } from 'redux';
import { ReduxState, IModal, User } from 'reducers';

// layout
import Footer from 'layout/Footer/Footer';
import NotFound from 'layout/NotFound';

// containers
import HomeContainer from 'containers/HomeContainer/HomeContainer';
import LoginUserContainer from 'containers/LoginContainer/LoginContainer';
import ProfileContainer from 'containers/ProfileContainer/ProfileContainer';
import RegisterUserContainer from 'containers/RegistreContainer/RegisterContainer';
import GameContainer from '../GameContainer/GameContainer';

// components
import Modal from 'components/ui/Modal/Modal';
// hoc
import ProtectedRoute from 'hoc/ProtectedRoute';

// actions
import startupActions from 'reducers/startup';
import loginUserActions from 'reducers/authUser/login';

// utils
import classNames from 'utils/classNames';

// hooks
import { useDidMount, useDidUpdate, useListener } from 'hooks';

// styles
import classes from './rootContainer.module.scss';

const footerRoutes = ['/'];

let timer: number | null = null;

interface IMapToProps {
  modal: IModal;
  startupEnd: boolean;
  user: User;
}

interface IDispatchToProps {
  startup: () => void;
  logout: () => void;
}

type Props = IMapToProps & IDispatchToProps & RouteComponentProps;

const RootContainer = ({
 modal, startup, startupEnd, location, user, history, logout,
}: Props) => {
  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      logout();
    }, 420000);
  };

  /*  useListener('mousemove', resetTimer);
  useListener('keypress', resetTimer);
  useListener('wheel', resetTimer);
  useListener('click', resetTimer); */

  useDidMount(() => {
    startup();
  });

  useDidUpdate(() => {
    if (isEmpty(user)) {
      history.push('/');
    }
  }, [user]);

  if (!startupEnd) return <div />;
  return (
    <div className={classNames(classes.container)}>
      <div className={classes.app_container}>
        <Switch>
          <Route path="/" exact component={HomeContainer} />
          <Route path="/login" component={LoginUserContainer} />
          <Route path="/register" component={RegisterUserContainer} />
          <Route path="/game" exact render={props => <GameContainer {...props} />} />
          <ProtectedRoute path="/profile" component={ProfileContainer} />
          <Route component={NotFound} />
        </Switch>
        <Modal {...modal} />
      </div>
      {footerRoutes.find(route => !!matchPath(location.pathname, { path: route, exact: true })) && (
        <Footer />
      )}
    </div>
  );
};

const mapStateToProps = ({ modal, startup, authUser }: ReduxState): IMapToProps => ({
  modal,
  startupEnd: startup,
  user: authUser.user,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  startup: () => dispatch(startupActions.startup()),
  logout: () => dispatch(loginUserActions.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);
