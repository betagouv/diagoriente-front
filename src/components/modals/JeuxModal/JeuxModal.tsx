import React from 'react';

import ContinueButton from '../../buttons/ContinueButtom/ContinueButton';

import iconCheck from '../../../assets/icons/svg/icon-check-blue.svg';

import classNames from '../../../utils/classNames';
import classes from './JeuxModal.module.scss';

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const JeuxModal = ({ onClick }: Props) => (
  <div className={`${classes.wrapper} flex_center`}>
    <div className={classes.container}>
      <div className={`flex_center ${classes.content}`}>
        <div className={`${classes.header} ${classes.item}`}>
          <div className={classes.circle_container}>
            <div className={classes.circle_absolute} />
            <div className={classNames(classes.circle)}>
              <img src={iconCheck} height="40%" width="40%" alt="t" />
            </div>
          </div>
        </div>
        <div className={classNames(classes.title, classes.item)}>
          Parfait !
          <br />
          Tu as terminé le mini jeux
        </div>
        <div className={`${classes.description} ${classes.item}`}>
          Grâce au mini jeu tu comprends que dans toute expérience se cachent des compétences! Tu es
          prêt maintenant pour réaliser ta propre carte de compétences
        </div>
        <div className={`flex_center ${classes.footer} ${classes.item}`}>
          <ContinueButton
            onClick={onClick}
            label="Terminer"
            className={classNames(classes.continue_button)}
          />
        </div>
      </div>
    </div>
  </div>
);

export default JeuxModal;
