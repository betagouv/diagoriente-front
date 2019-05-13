import React from 'react';
import classes from './successModal.module.scss';
import ContinueButton from '../../buttons/ContinueButtom/ContinueButton';

import iconCheck from '../../../assets/icons/svg/icon-check-02.svg';
import rectangle from '../../../assets/icons/svg/rectangle.svg';

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SuccessModal = ({ onClick }: Props) => {
  return (
    <div className={`${classes.wrapper} flex_center`}>
      <div className={classes.container}>
        <div className={`flex_center ${classes.content}`}>
          <div className={`${classes.header} ${classes.item}`}>
            <div className={classes.circle_container}>
              <div className={classes.circle_absolute} />
              <div className={classes.circle}>
                <img src={iconCheck} height={'40%'} width={'40%'} />
              </div>
            </div>
          </div>
          <div className={`${classes.title} ${classes.item}`}>
            Parfait ! <br /> Tu as terminé cette section
          </div>
          <div className={`${classes.description} ${classes.item}`}>
            Continue à compléter tes compétences pour voir des métiers adaptés et des offres d’emploi
          </div>
          <div className={`flex_center ${classes.footer} ${classes.item}`}>
            <ContinueButton onClick={onClick} className={classes.continue_button} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
