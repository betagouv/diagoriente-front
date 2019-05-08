import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import classes from './button.module.scss';
import classNames from '../../../utils/classNames';

const ButtonForm = (props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return (
    <button {...props} className={classNames(classes.button, props.className)}>
      <span className={classes.btn_text}>{props.title}</span>
    </button>
  );
};

export default ButtonForm;
