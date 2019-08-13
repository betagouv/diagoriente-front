import React from 'react';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
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
          <MultiIcon
            type="prev"
            withText
            text="annulé"
            width="15"
            left
            height="15"
            withBorder
            style={{ padding: 0 }}
            onClick={onCloseModal}
          />
          <MultiIcon
            type="remove"
            withText
            text="supprimé"
            width="37"
            height="37"
            withBorder
            Iconcolor="#ff001f"
            textColor="#ff001f"
            style={{ padding: 0 }}
            onClick={deleteTheme}
          />
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
