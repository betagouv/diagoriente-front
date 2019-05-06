import React from 'react';
import logo from '../../assets/icons/logo/diagoriente-logo-01.png';
import logo2x from '../../assets/icons/logo/diagoriente-logo-01@2x.png';
import logo3x from '../../assets/icons/logo/diagoriente-logo-01@3x.png';
import classes from './header.module.scss';
import classNames from '../../utils/classNames';
export default function Header() {
  return (
      <div className={classes.headerContainer}>
        <div className={classes.logoWrapper}>
          <img
            src={logo}
            srcSet={`${logo2x} 2x, ${logo3x} 3x`}
            alt="Logo"
            className={classNames(classes.logo, 'item-12 item-xl-10 item-md-8 item-sm-6  item-xs-4')}
          />
        </div>
      </div>
  );
}
