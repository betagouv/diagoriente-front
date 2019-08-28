import React from 'react';
import Button from 'components/buttons/RoundButton/RoundButton';

import classes from './invalid.module.scss';

interface IProps {
  onCloseModal: () => void;
  text: string;
  onClick?: () => void;
}

const InvalidModal = ({ onCloseModal, text, onClick }: IProps) => (
  <div className={classes.wrapperModal}>
    <div className={classes.container}>
      <div className={classes.title_container}>
        <span>{text}</span>
      </div>

      <div className={classes.btn_container}>
        <Button onClick={onClick || onCloseModal} className={classes.btnOut}>
          {onClick ? 'Ok' : 'Retour'}
        </Button>
      </div>
    </div>
  </div>
);
export default InvalidModal;
