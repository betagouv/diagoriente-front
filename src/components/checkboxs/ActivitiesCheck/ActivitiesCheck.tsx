import React from 'react';
import ReactTooltip from 'react-tooltip';

import classes from './ActiviesCheck.module.scss';
interface Props {
  selected: boolean;
  onCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  tooltip: string;
}
const CheckBox = ({
  selected,
  onCheckChange,
  id,
  tooltip,
  ...other
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & Props) => {
  const dataTip: string = selected ? 'Je l’ai déjà fait !' : tooltip;
  return (
    <div className={classes.squaredCheck} data-tip={dataTip} data-for={id}>
      <input
        type="checkbox"
        onChange={onCheckChange}
        checked={selected}
        id={id}
        className={classes.checkInput}
        {...other}
      />
      <label htmlFor={id} />
      <ReactTooltip id={id} className={'tooltip'} />
    </div>
  );
};

export default CheckBox;
