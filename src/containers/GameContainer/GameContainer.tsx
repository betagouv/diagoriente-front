import React, { Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import Header from 'components_v3/Header/Header';

import classes from './game.module.scss';
import modalActions from '../../reducers/modal';
import JeuxModal from '../../components/modals/JeuxModal/JeuxModal';

interface IDispatchToProps {
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
}
interface Props extends RouteComponentProps, IDispatchToProps {}

const GameContainer = ({ history, openModal, closeModal }: Props) => {
  const onClickModal = () => {
    closeModal();
    history.push('/profile');
  };

  const onNavigate = () => {
    openModal(<JeuxModal onClick={onClickModal} />, classes.backdrop);
  };
  return (
    <Fragment>
      <Header showLogout={false} HeaderProfile />
      <div className={classes.frame_container}>
        <div className={classes.frame_overlay_container}>
          <iframe
            title="game"
            className={classes.frame}
            frameBorder="0"
            src="https://monbilansnu.beta.gouv.fr/game-diagoriente/"
          />
        </div>
      </div>
      <div className={classes.btn_container}>
        <MultiIcon
          type="validate"
          withText
          footer
          text="passer à la suite"
          width="35"
          height="35"
          textColor="#ffba27"
          Iconcolor="#ffba27"
          onClick={onNavigate}
        />
      </div>
    </Fragment>
  );
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  openModal: (children, backdropClassName) =>
    dispatch(modalActions.openModal({ children, backdropClassName })),
  closeModal: () => dispatch(modalActions.closeModal()),
});
export default connect(
  null,
  mapDispatchToProps,
)(GameContainer);
