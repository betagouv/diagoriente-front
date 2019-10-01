import React from 'react';
import Button from 'components_v3/button/button';

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
        <Button onClick={onClick || onCloseModal} className={classes.btnOut} title={onClick ? 'Ok' : 'Retour'} color="red" />
      </div>
    </div>
  </div>
);
export default InvalidModal;
