import React from 'react';
import classes from './circle.module.scss';
import classNames from '../../../utils/classNames';

const Circle = ({ className, color, children, ...other }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={classNames(classes.circle, className)} {...other} style={{ color: `${color}` }}>
      {children}
    </div>
  );
};

export default Circle;
