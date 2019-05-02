import React from 'react';
import classes from './roundButton.module.scss';
import classNames from '../../../utils/classNames';

const Button = ({
  className,
  children,
  ...other
}: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return (
    <button className={classNames(classes.button, className)} {...other}>
      {children}
    </button>
  );
};

export default Button;
