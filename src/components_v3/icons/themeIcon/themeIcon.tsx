import React from 'react';
import classes from './themeIcon.module.scss';
import classNames from '../../../utils/classNames';

interface Props {
  icon: string;
  title: string;
  color?: string;
  width?: number;
}

const ThemeIcon = ({ icon, title, color, className, width, ...other }: Props & React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className={classes.container} style={{ width }} {...other}>
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