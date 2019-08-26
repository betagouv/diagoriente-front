import React from 'react';
import classes from './button.module.scss';
import classNames from '../../utils/classNames';

interface Props {
  title: string;
}

const Button = ({
  title,
  className,
  ...other
}: Props & React.HTMLAttributes<HTMLButtonElement>) => (
  <button className={classNames(classes.button, className)} {...other}>
    <span>{title}</span>
  </button>
  );
export default Button;
