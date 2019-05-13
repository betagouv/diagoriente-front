import React from 'react';
import classes from './roundButton.module.scss';
import classNames from '../../../utils/classNames';

interface IProps {
  fetching?: boolean;
}

const Button = ({
  className,
  children,
  fetching,
  ...other
}: IProps & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return (
    <button className={classNames(classes.button, className)} {...other}>
      {children}
    </button>
  );
};

export default Button;
