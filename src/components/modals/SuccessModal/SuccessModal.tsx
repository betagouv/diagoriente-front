import React from 'react';

import ContinueButton from '../../buttons/ContinueButtom/ContinueButton';

import iconCheck from '../../../assets/icons/svg/icon-check-02.svg';
import iconCheckPro from '../../../assets/icons/svg/icon-check-pro-02.svg';

import classNames from '../../../utils/classNames';
import classes from './successModal.module.scss';

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: 'personal' | 'professional';
}

const SuccessModal = ({ onClick, type }: Props) => {
  return (
    <div className={`${classes.wrapper} flex_center`}>
      <div className={classes.container}>
        <div className={`flex_center ${classes.content}`}>
          <div className={`${classes.header} ${classes.item}`}>
            <div className={classes.circle_container}>
              <div className={classes.circle_absolute} />
              <div className={classNames(classes.circle, type === 'professional' && classes.circle_pro)}>
                <img src={type === 'professional' ? iconCheckPro : iconCheck} height={'40%'} width={'40%'} />
              </div>
            </div>
          </div>
          <div className={classNames(classes.title, classes.item, type === 'professional' && classes.title_pro)}>
            Parfait ! <br /> Tu as terminé cette section
          </div>
          <div className={`${classes.description} ${classes.item}`}>
            Tu pourras revenir pour ajouter et/ou modifier des expériences
          </div>
          <div className={`flex_center ${classes.footer} ${classes.item}`}>
            <ContinueButton
              onClick={onClick}
              label="Tu peux checker ta carte ou passer à l’étape 3"
              className={classNames(classes.continue_button, type === 'professional' && classes.continue_button_pro)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
