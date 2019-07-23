import React from 'react';
import classes from './sideBar.module.scss';
import classNames from '../../utils/classNames';
import SideBarButton from './sideBarButtons/sideBarButton';


const SideBar = ({className, ...other }:  React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className={classNames(classes.container, className)} {...other}>
      <SideBarButton color={'white'} background={'#7a93bc'} background2={'#f7b73e'} title={'introduction'} hasIcon />
    </div>
  );
};
export default SideBar;