import React from 'react';

import classes from './title.module.scss';
interface IProps {
  title: string;
  logo?: string;
}

const Title = ({ title, logo }: IProps) => (
  <div className={classes.title_container}>
    {logo && (
      <div className={classes.logo_container}>
        <img className={classes.logo} alt="logo" src={logo} />
      </div>
    )}

    <div className={classes.title_content}>
      <span className={classes.title}>{title}</span>
    </div>
  </div>
);
export default Title;
