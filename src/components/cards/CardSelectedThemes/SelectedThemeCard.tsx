import React from 'react';
import ReactTooltip from 'react-tooltip';

import classes from './selectedCard.module.scss';

interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  title: string;
  logo?: string;
  open?: boolean;
  isSelected?: boolean;
  themetype?: string;
}

const SelectedCard = ({ title, logo, themetype, isSelected, ...other }: IProps) => (
  <button data-tip data-for={title} className={classes.wrapper} {...other}>
    <div
      className={
        themetype === 'professional'
          ? isSelected
            ? classes.box_selected_pro
            : classes.container
          : !isSelected
          ? classes.container
          : classes.box_selected
      }
    >
      {logo && (
        <div className={themetype === 'professional' ? classes.logo_container_pro : classes.logo_container}>
          <img alt="logo" src={logo} className={classes.logo} />
        </div>
      )}
      <span className={classes.theme_title}>{title}</span>
    </div>
    {isSelected && <div className={themetype === 'professional' ? classes.triangle_pro : classes.triangle} />}
    <ReactTooltip id={title} place="right" type="light" className={classes.tooltip}>
      {title}
    </ReactTooltip>
  </button>
);
export default SelectedCard;
