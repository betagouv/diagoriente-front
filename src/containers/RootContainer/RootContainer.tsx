import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Switch, Route, RouteComponentProps, matchPath } from 'react-router-dom';

// types
import { AnyAction } from 'redux';
import { ReduxState, IModal, User } from 'reducers';

// layout
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import NotFound from '../../layout/NotFound';

// containers
import HomeContainer from '../HomeContainer/HomeContainer';
import ThemesContainer from '../ThemesContainer/ThemesContainer';
import ThemeContainer from '../ThemeContainer/ThemeContainer';
import LoginUserContainer from '../LoginContainer/LoginContainer';
import ProfileContainer from '../ProfileContainer/ProfileContainer';
import RegisterUserContainer from '../RegistreContainer/RegisterContainer';

// components
import Modal from '../../components/ui/Modal/Modal';
import ProtectedRoute from '../../hoc/ProtectedRoute';

// styles
import classes from './rootContainer.module.scss';
import classNames from '../../utils/classNames';

// actions
import startupActions from '../../reducers/startup';

// hooks
import { useDidMount, useDidUpdate } from '../../hooks';

const footerRoutes = ['/'];

interface IMapToProps {
  modal: IModal;
  startupEnd: boolean;
  user: User | {};
}

interface IDispatchToProps {
  startup: () => void;
}

type Props = IMapToProps & IDispatchToProps & RouteComponentProps;

const RootContainer = ({ modal, startup, startupEnd, location, user, history }: Props) => {
  useDidMount(() => {
    startup();
  });

  useDidUpdate(() => {
    if (isEmpty(user)) {
      history.push('/');
    }
  },           [user]);

  if (!startupEnd) return <div />;
  return (
    <div className={classNames(classes.container)}>
      {/*   <Header />
       */}
      <div className={classes.app_container}>
        <Switch>
          <Route path={'/'} exact component={HomeContainer} />
          <Route path={'/login'} component={LoginUserContainer} />
          <Route path={'/register'} component={RegisterUserContainer} />

          <ProtectedRoute path={'/themes'} exact component={ThemesContainer} />
          <ProtectedRoute path={'/theme/:id'} component={ThemeContainer} />
          <ProtectedRoute path={'/profile'} exact component={ProfileContainer} />
          <Route component={NotFound} />
        </Switch>
        <Modal {...modal} />
      </div>
      {footerRoutes.find(route => !!matchPath(location.pathname, { path: route, exact: true })) && <Footer />}
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);
