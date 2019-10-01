import React from 'react';
import Button from 'components_v3/button/button';
import classes from './deleteModal.module.scss';

interface IProps {
  onDelete: () => void;
  onCloseModal: () => void;
}

const DeleteModal = ({ onDelete, onCloseModal }: IProps) => {
  const deleteTheme = () => {
    onDelete();
    onCloseModal();
  };
  return (
    <div className={classes.wrapperModal}>
      <div className={classes.container}>
        <div className={classes.title_container}>
          <span>Attention, vous allez supprimer ce theme !</span>
        </div>
        <div className={classes.btn_container}>
          <Button onClick={onCloseModal} className={classes.btn} title="Annuler" color="red"  />
          <Button onClick={deleteTheme} className={classes.btn} title="Supprimer" color="blue"  />
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
