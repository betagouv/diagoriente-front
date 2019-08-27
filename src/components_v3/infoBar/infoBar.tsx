import React from 'react';
import classNames from 'utils/classNames';
import classes from './infoBar.module.scss';

interface Props {
  infoTitle: string;
}

const InfoBar = ({ className, infoTitle, ...other }: React.HTMLAttributes<HTMLElement> & Props) => (
  <div className={classNames(classes.container, className)} {...other}>
    <span className={classes.tetx}>{infoTitle}</span>
  </div>
);
export default InfoBar;
