import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import classes from './Header.module.scss';
import logo from '../../assets/icons/logo/Diagoriente_Logo.svg';
import ColoredLine from '../ColoredLine/ColoredLine';

interface Props {
  HeaderProfile?: boolean;
}
const Header = ({ HeaderProfile, history }: Props & RouteComponentProps) => {
  function onNavigate() {
    history.push('/profile/skills');
  }
  return (
    <div className={HeaderProfile ? classes.Header : classes.HeaderContainer}>
      <ColoredLine />
      <img src={logo} alt="logo" className={classes.logo} onClick={onNavigate} />
    </div>
  );
};

export default withRouter(Header);
