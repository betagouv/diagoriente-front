import React from 'react';
import Button from 'components/buttons/RoundButton/RoundButton';
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
          <Button onClick={onCloseModal} className={classes.btn}>
            Annuler
          </Button>
          <Button onClick={deleteTheme} className={classes.btnOut}>
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
