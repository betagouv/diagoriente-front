import React from 'react';
import classes from './likeButton.module.scss';
import classNames from '../../../utils/classNames';
interface Props {
  checkedButon?: boolean;
}
const Button = ({
  className,
  children,
  checkedButon,
  ...other
}: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & Props) => {
  return (
    <button
      className={checkedButon ? classNames(classes.buttonChecked, className) : classNames(classes.button, className)}
      {...other}
    >
      {children}
    </button>
  );
};

export default Button;
