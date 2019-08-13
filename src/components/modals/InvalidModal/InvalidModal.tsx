import React from 'react';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import classes from './invalid.module.scss';

interface IProps {
  onCloseModal: () => void;
  text: string;
}

const DeleteModal = ({ onCloseModal, text }: IProps) => (
  <div className={classes.wrapperModal}>
    <div className={classes.container}>
      <div className={classes.title_container}>
        <span>{text}</span>
      </div>

      <div className={classes.btn_container}>
        <MultiIcon
          type="prev"
          withText
          text="retour"
          width="15"
          height="15"
          withBorder
          style={{ padding: 0 }}
          onClick={onCloseModal}
        />
      </div>
    </div>
  </div>
);
export default DeleteModal;
