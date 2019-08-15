import React from 'react';
import classes from './Header.module.scss';
import logo from '../../assets/icons/logo/Diagoriente_Logo.svg';
import ColoredLine from '../ColoredLine/ColoredLine';

interface Props  {
HeaderProfile?: boolean;

}
const Header = ({ HeaderProfile }: Props ) => {
  return (
    <div className={HeaderProfile ? classes.Header : classes.HeaderContainer}>
      <ColoredLine />
      <img src={logo} alt={'logo'} className={classes.logo} />
    </div>
  );
};
export default Header;
