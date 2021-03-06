import React from 'react';
import ReactTooltip from 'react-tooltip';

import classes from './selectedCard.module.scss';

import classNames from '../../../utils/classNames';

interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  title: string;
  logo?: string;
  open?: boolean;
  isSelected?: boolean;
  themetype?: string;
  numberOfLine?: number;
}

const SelectedCard = ({ title, logo, themetype, isSelected, children, numberOfLine, ...other }: IProps) => (
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
      <div
        style={numberOfLine ? { WebkitLineClamp: numberOfLine } : {}}
        className={classNames(classes.theme_title, numberOfLine && classes.theme_title_multiline)}
      >
        {title}
      </div>
      {children}
    </div>
    {isSelected && <div className={themetype === 'professional' ? classes.triangle_pro : classes.triangle} />}
    <ReactTooltip id={title} place="right" type="light" className={classes.tooltip}>
      {title}
    </ReactTooltip>
  </button>
);
export default SelectedCard;
