import React from 'react';
import classes from './button.module.scss';
import classNames from '../../../utils/classNames';

const Button  = ({ className, children, ...other }: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
        <button className={classNames(classes.button, className) } {...other} >
            {children}
        </button>
  );
};

export default Button;
