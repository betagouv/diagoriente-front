import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import classes from './continueButton.module.scss';
import start_arrow from '../../../assets/icons/start-arrow.png';

const ContinueButton = (props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return (
    <button className={classes.button} {...props}>
      <span className={classes.btn_text}>Continuer</span>
      <img src={start_arrow} alt="start" />
    </button>
  );
};

export default ContinueButton;
