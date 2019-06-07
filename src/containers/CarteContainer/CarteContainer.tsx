import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";
import Header from "../../layout/Header/Header";
import classes from "./carte.module.scss";
import Button from "../../components/buttons/ContinueButtom/ContinueButton";
import modalActions from "../../reducers/modal";
import JeuxModal from "../../components/modals/JeuxModal/JeuxModal";

// hooks
import { useDidMount } from "../../hooks";

// types
import { ReduxState, ApiReducer, IParcoursResponse } from "reducers";

// api
import withApis from "../../hoc/withApi";
import { getParcours } from "../../requests";

import { pdf } from "../../utils/pdf";

import cancel from "../../assets/icons/svg/cancel.svg";

interface IDispatchToProps {
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
}

const CarteContainer = ({
  history,
  openModal,
  closeModal,
  getParcours,
  parcours,
  authUser
}: RouteComponentProps & IDispatchToProps & any) => {
  useDidMount(() => {
    if (parcours.data._id) {
      getParcours.call(parcours.data._id);
    }
  });
  const onClick = () => {
    history.goBack();
  };
  const onClickModal = () => {
    closeModal();
    history.push("/profile");
  };
  const onNavigate = () => {
    openModal(<JeuxModal onClick={onClickModal} />, classes.backdrop);
  };
  let iframe = null;
  if (!getParcours.fetching && Object.keys(getParcours.data).length)
    iframe = (
      <iframe
        height="350"
        width="400"
        title="Carte de compétence"
        className={classes.frame}
        frameBorder="0"
        src={pdf(parcours, getParcours, authUser, true)}
      />
    );
  return (
    <>
      <Header showLogout={false} pathTo="/profile" />
      <div className={classes.frame_container}>
        <div className={classes.frame_overlay_container}>{iframe}</div>
      </div>
      <div className={classes.btn_container}>
        <Button onClick={onClickModal} label="passer à la suite" />
      </div>
    </>
  );
};

const mapStateToProps = ({ parcours, authUser }: ReduxState) => ({
  parcours,
  authUser
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  openModal: (children, backdropClassName) => dispatch(modalActions.openModal({ children, backdropClassName })),
  closeModal: () => dispatch(modalActions.closeModal())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApis({ getParcours })(CarteContainer));
