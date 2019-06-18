import React from 'react';
import classes from './stars.module.scss';
import classNames from '../../../utils/classNames';
import Star from '../../../assets/icons/svg/favoris.svg';

const Stars = ({ className, children, ...other }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className={classNames(classes.container, className)} {...other}>
      <img src={Star} alt="" className={classes.t1} />
      <img src={Star} alt="" className={classes.t2} />
      <img src={Star} alt="" className={classes.t3} />
      <img src={Star} alt="" className={classes.t4} />
      <img src={Star} alt="" className={classes.t5} />
    </div>
  );
};

export default Stars;
