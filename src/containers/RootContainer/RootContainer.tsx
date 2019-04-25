import React, { Dispatch } from 'react';
import { connect } from 'react-redux';

// types
import { AnyAction } from 'redux';
import { ReduxState, IModal } from 'reducers';

// layout
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import NotFound from '../../layout/NotFound';

// containers
import HomeContainer from '../HomeContainer/HomeContainer';
import ThemesContainer from '../ThemesContainer/ThemesContainer';
import ThemeContainer from '../ThemeContainer/ThemeContainer';
import LoginUserContainer from '../LoginContainer';

// components
import Modal from '../../components/ui/Modal/Modal';
import ProtectedRoute from '../../hoc/ProtectedRoute';

// styles
import classes from './rootContainer.module.scss';
import classNames from '../../utils/classNames';

// actions
import startupActions from '../../reducers/startup';

// hooks
import { useDidMount } from '../../hooks';
import { Switch, Route } from 'react-router';

import loginActions from '../../reducers/authUser/login';

interface IMapToProps {
  modal: IModal;
  startupEnd: boolean;
}

interface IDispatchToProps {
  startup: () => void;
  loginRequest: (email: string, password: string) => void;
}

type Props = IMapToProps & IDispatchToProps;

const RootContainer = ({ modal, startup, startupEnd, loginRequest }: Props) => {
  useDidMount(() => {
    startup();
    // loginRequest('fedi@gmail.com', 'Ff22023755');
  });
  if (!startupEnd) return <div />;
  return (
    <div className={classNames(classes.container, 'flex_column')}>
      <Header />
      <Switch>
        <Route path={'/'} exact component={HomeContainer} />
        <Route path={'/login'} component={LoginUserContainer} />
        <ProtectedRoute path={'/themes'} exact component={ThemesContainer} />
        <ProtectedRoute path={'/theme/:id'} component={ThemeContainer} />
        <Route component={NotFound} />
      </Switch>
      <Modal {...modal} />
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ modal, startup }: ReduxState): IMapToProps => ({
  modal,
  startupEnd: startup,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  startup: () => dispatch(startupActions.startup()),
  loginRequest: (email, password) => dispatch(loginActions.loginUserRequest({ email, password })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);
