import React from 'react';

import classes from './title.module.scss';
interface IProps {
  title: string;
  logo?: string;
  type?: string;
}

const Title = ({ title, logo, type }: IProps) => (
  <div className={classes.title_container}>
    {logo && (
      <div className={type === 'professional' ? classes.logo_pro : classes.logo_container}>
        <img className={classes.logo} alt="logo" src={logo} />
      </div>
    )}

    <div className={classes.title_content}>
      <span
        className={type === 'professional' ? classes.title_pro : type === 'type' ? classes.title_type : classes.title}
      >
        {title}
      </span>
    </div>
  </div>
);
export default Title;
