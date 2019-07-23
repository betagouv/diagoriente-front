import React from 'react';
import classes from './themeIcon.module.scss';
import classNames from '../../../utils/classNames';

interface Props {
  icon: string;
  title: string;
}

const ThemeIcon = ({ icon, title, className, ...other }: Props & React.HTMLAttributes<HTMLElement>) => {
  return (
      <div className={classes.container}>
    <div className={classNames(classes.iconWrapper, className)} {...other}>
        <img className={classes.icon} src={icon} alt="icon" />
      </div>
      <span className={classes.title}>{title}</span>
    </div>
  );
};

export default ThemeIcon;
