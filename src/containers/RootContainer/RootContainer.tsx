import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';

import { ReduxState, IModal } from 'reducers';

import Modal from '../../components/ui/Modal/Modal';

import classes from './rootContainer.module.scss';
import classNames from '../../utils/classNames';

import startupActions from '../../reducers/startup';

import { useDidMount } from '../../hooks';

type Props = {
  modal: IModal;
  startup: () => void;
};

const RootContainer = ({ modal, startup }: Props) => {
  useDidMount(() => {
    startup();
  });

  return (
    <div className={classNames(classes.container, 'flex_column')}>
      <Modal {...modal} />
    </div>
  );
};

const mapStateToProps = ({ modal }: ReduxState) => ({
  modal,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  startup: () => dispatch(startupActions.startup()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);
