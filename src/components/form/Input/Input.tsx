import React from 'react';
import classNames from '../../../utils/classNames';
import classes from './input.module.scss';
import { Z_MEM_ERROR } from 'zlib';

interface Props {
  name: string;
  validation: string;
  type?: string;
  email?: boolean;
}
type props = Props & React.HTMLAttributes<HTMLInputElement>;

const Input = ({ className, name, validation, type, email, ...other }: props) => {
  return (
    <div className={className}>
      <div className={classes.login_container_input}>
        <span className={classes.label_input}>{name}</span>

        <input className={classes.input_login} type={type} {...other} />
        {validation !== '' && <span className={classes.error_input}>{validation}</span>}
      </div>
    </div>
  );
};

export default Input;
