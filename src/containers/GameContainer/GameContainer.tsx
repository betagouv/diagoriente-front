import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Header from '../../layout/Header/Header';
import classes from './game.module.scss';
import Button from '../../components/buttons/ContinueButtom/ContinueButton';
import modalActions from '../../reducers/modal';
import JeuxModal from '../../components/modals/JeuxModal/JeuxModal';

import cancel from '../../assets/icons/svg/cancel.svg';
interface IDispatchToProps {
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
}
const GameContainer = ({ history, openModal, closeModal }: RouteComponentProps & IDispatchToProps) => {
  const onClick = () => {
    history.goBack();
  };
  const onClickModal = () => {
    closeModal();
    history.push('/profile');
  };
  const onNavigate = () => {
    openModal(<JeuxModal onClick={onClickModal} />, classes.backdrop);
  };

  return (
    <>
      <Header showLogout={false} pathTo="/profile" />
      <div className={classes.frame_container}>
        <div className={classes.frame_overlay_container}>
          <iframe className={classes.frame} frameBorder="0" src="https://monbilansnu.beta.gouv.fr/game-diagoriente/" />
        </div>
      </div>
      <div className={classes.btn_container}>
        <Button onClick={onNavigate} label="passer à la suite" />
      </div>
    </>
  );
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  openModal: (children, backdropClassName) => dispatch(modalActions.openModal({ children, backdropClassName })),
  closeModal: () => dispatch(modalActions.closeModal()),
});
export default connect(
  null,
  mapDispatchToProps,
)(GameContainer);
