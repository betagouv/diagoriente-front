import React from 'react';
import ReactTooltip from 'react-tooltip';

import classes from './ActiviesCheck.module.scss';
interface Props {
  selected: boolean;
  OnCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}
const CheckBox = ({
  selected,
  OnCheckChange,
  id,
  ...other
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & Props) => {
  return (
    <div className={classes.squaredCheck}>
      <input
        type="checkbox"
        onChange={OnCheckChange}
        checked={selected}
        id={id}
        className={classes.checkInput}
        {...other}
      />
      <label htmlFor={id} data-tip="Je l’ai déjà fait !" />
      <ReactTooltip disable={!selected} className={'tooltip'} />
    </div>
  );
};

export default CheckBox;
