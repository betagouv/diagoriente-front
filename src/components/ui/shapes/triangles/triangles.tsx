import React from 'react';
import classes from './triangles.module.scss';
import classNames from '../../../../utils/classNames';
import Triangle from '../../../../assets/icons/svg/custom2.svg';

const Triangles = ({ className, children, ...other }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className={classNames(classes.container, className)} {...other}>
      <img src={Triangle} alt="" className={classes.t1} />
      <img src={Triangle} alt="" className={classes.t2} />
      <img src={Triangle} alt="" className={classes.t3} />
      <img src={Triangle} alt="" className={classes.t4} />
    </div>
  );
};

export default Triangles;
