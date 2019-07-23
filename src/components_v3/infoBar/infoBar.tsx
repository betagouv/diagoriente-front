import React from 'react';
import classes from './infoBar.module.scss';
import classNames from '../../utils/classNames';

interface Props {
  infoTitle: string;
}

const InfoBar = ({ className, infoTitle, ...other }: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={classNames(classes.container, className)} {...other}>
      <span className={classes.tetx}>{infoTitle}</span>
    </div>
  );
};
export default InfoBar;
