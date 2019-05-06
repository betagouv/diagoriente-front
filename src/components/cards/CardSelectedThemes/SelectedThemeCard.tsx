import React from 'react';
import ReactTooltip from 'react-tooltip';

import classes from './selectedCard.module.scss';

interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  title: string;
  logo?: string;
  open?: boolean;
  isSelected?: boolean;
}

const SelectedCard = ({ title, logo, isSelected, ...other }: IProps) => (
  <button data-tip data-for={title} className={classes.wrapper} {...other}>
    <div className={isSelected ? classes.box_selected : classes.container}>
      {logo && (
        <div className={classes.logo_container}>
          <img alt="logo" src={logo} className={classes.logo} />
        </div>
      )}
      <span className={classes.theme_title}>{title}</span>
    </div>
    {isSelected && <div className={classes.triangle} />}
    <ReactTooltip id={title} place="right" type="light" className={classes.tooltip}>
      {title}
    </ReactTooltip>
  </button>
);
export default SelectedCard;
