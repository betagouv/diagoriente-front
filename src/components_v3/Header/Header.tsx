import React from 'react';
import classes from './Header.module.scss';
import logo from '../../assets/icons/logo/Diagoriente_Logo.svg';
import ColoredLine from '../ColoredLine/ColoredLine';
const Header = () => {
  return (
    <div className={classes.HeaderContainer}>
      <ColoredLine />
      <img src={logo} alt={'logo'} className={classes.logo} />
    </div>
  );
};
export default Header;
