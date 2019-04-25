import React, { Dispatch } from 'react';
import { connect } from 'react-redux';

// types
import { AnyAction } from 'redux';
import { ReduxState, IModal } from 'reducers';

// layout
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';

// containers
import HomeContainer from '../HomeContainer/HomeContainer';

// components
import Modal from '../../components/ui/Modal/Modal';

// styles
import classes from './rootContainer.module.scss';
import classNames from '../../utils/classNames';

// actions
import startupActions from '../../reducers/startup';

// hooks
import { useDidMount } from '../../hooks';
import { Switch, Route } from 'react-router';

type Props = {
  modal: IModal;
  startup: () => void;
  startupEnd: boolean;
};

const RootContainer = ({ modal, startup, startupEnd }: Props) => {
  useDidMount(() => {
    startup();
  });
  if (!startupEnd) return <div />;
  return (
    <div className={classNames(classes.container)}>
      <Header />
      <Switch>
        <Route path={'/'} exact component={HomeContainer} />
        {/* TODO add not found page */}
      </Switch>
      <Modal {...modal} />
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ modal, startup }: ReduxState) => ({
  modal,
  startupEnd: startup,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  startup: () => dispatch(startupActions.startup()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);
