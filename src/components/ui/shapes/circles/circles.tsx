import React from 'react';
import classes from './circles.module.scss';
import classNames from '../../../../utils/classNames';

const Circles = ({ className, children, ...other }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className={classNames(classes.container, className)} {...other}>
      <div className={classes.round}></div>
      <div className={classes.round2}></div>
      <div className={classes.round3}></div>
      <div className={classes.round4}></div>
    </div>
  );
};

export default Circles;
