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
import ProfileContainer from '../ProfileContainer';
import RegisterUserContainer from '../RegistreContainer';


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

interface IMapToProps {
  modal: IModal;
  startupEnd: boolean;
}

interface IDispatchToProps {
  startup: () => void;
}

type Props = IMapToProps & IDispatchToProps;

const RootContainer = ({ modal, startup, startupEnd }: Props) => {
  useDidMount(() => {
    startup();
  });
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);
