import React from 'react';
import classes from './themeIcon.module.scss';
import classNames from '../../../utils/classNames';

interface Props {
  icon: string;
  title: string;
  color?: string;
}

const ThemeIcon = ({ icon, title, color, className, ...other }: Props & React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className={classes.container} {...other}>
      <div className={classNames(classes.iconWrapper, className)}>
        <img className={classes.icon} src={icon} alt="icon" />
      </div>
      <span className={classes.title} style={{ color }}>
        {title}
      </span>
    </div>
  );
};

export default ThemeIcon;
