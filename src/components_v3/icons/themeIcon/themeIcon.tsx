import React from 'react';
import classes from './themeIcon.module.scss';

interface Props {
  icon?: string;
  title?: string;
  color?: string;
  width?: number;
}

const ThemeIcon = ({
  icon,
  title,
  color,
  className,
  width,
  ...other
}: Props & React.HTMLAttributes<HTMLElement>) => (
  <div className={classes.container} style={{ width }} {...other}>
    {/*  <div className={classNames(classes.iconWrapper, className)}> */}
    <img className={classes.icon} src={icon} alt="icon" />

    {/* <span className={classes.title} style={{ color }}>
        {title}
      </span> */}
  </div>
);

export default ThemeIcon;
