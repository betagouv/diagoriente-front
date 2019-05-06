import React, { useState } from 'react';
import classes from './stars.module.scss';
import classNames from '../../utils/classNames';
import ReactTooltip from 'react-tooltip';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  checked: boolean;
  onChange(): void;
  title: string;
}

const stars = ({ className, children, title, checked, onChange, ...other }: Props) => {
  return (
    <div className={classNames(classes.container, className)} {...other} data-tip={title}>
      <div className={!checked ? classes.star : classes.star_checked} onClick={onChange} />
      <ReactTooltip type="light" className={classes.tooltip_star}/>
    </div>
  );
};

export default stars;
