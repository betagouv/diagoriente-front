import React from 'react';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import classes from './invalid.module.scss';

interface IProps {
  onCloseModal: () => void;
  text: string;
  onClick?: () => void;
}

const DeleteModal = ({ onCloseModal, text, onClick }: IProps) => (
  <div className={classes.wrapperModal}>
    <div className={classes.container}>
      <div className={classes.title_container}>
        <span>{text}</span>
      </div>

      <div className={classes.btn_container}>
        <MultiIcon
          type={onClick ? 'validate' : 'prev'}
          withText
          text={onClick ? 'ok' : 'retour'}
          width={onClick ? '35' : '15'}
          height={onClick ? '35' : '15'}
          withBorder
          style={{ padding: 0 }}
          onClick={onClick || onCloseModal}
        />
      </div>
    </div>
  </div>
);
export default DeleteModal;
