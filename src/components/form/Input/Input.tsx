import React from 'react';
import classNames from '../../../utils/classNames';
import classes from './input.module.scss';

interface Props {
  name: string;
  validation: string;
  type?: string;
}
type props = Props & React.HTMLAttributes<HTMLInputElement>;

const Input = ({ className, name, validation, type, ...other }: props) => {
  return (
    <div className={className}>
      <div className={classes.login_container_input}>
        <span className={classes.label_input}>{name}</span>
        <input className={classes.input_login} type={type} {...other} />
        <span className={classes.error_input}>{validation}</span>
      </div>
    </div>
  );
};

export default Input;
