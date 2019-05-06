import React, { useState } from 'react';
import classes from './stars.module.scss';
import classNames from '../../utils/classNames';
import star_full from '../../assets/icons/stars/ic_star_full.svg';
import star_opacity from '../../assets/icons/stars/ic_star_opacity.svg';
import star_empty from '../../assets/icons/stars/ic_star_empty.svg';


interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  checked: boolean;
  onChange():void;
}

const stars = ({ className, children,checked,onChange, ...other }: Props) => {
  


  return (
    <div className={classNames(classes.container, className)} {...other}>
      <div className={!checked ? classes.star : classes.star_checked} onClick={onChange} />
    </div>
  );
};

export default stars;
