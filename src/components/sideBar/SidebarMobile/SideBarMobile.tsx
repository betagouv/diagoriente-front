import React from 'react';

// types
import { ITheme } from 'reducers';
// components
import SelectThemeCard from '../../cards/CardSelectedThemes/SelectedThemeCard';

// icons
import MENU from '../../../assets/icons/svg/menu.svg';
import CHECK from '../../../assets/icons/check/ic-check-01.png';

// style
import classNames from '../../../utils/classNames';
import classes from './sideBarMobile.module.scss';

type IProps = {
  options: ITheme[];
  open: boolean;
  toggleOpen: () => void;
};
const SideBarMobile = ({ options, open, toggleOpen }: IProps) => {
  return (
    <div className={classNames(classes.container_sideBar, open ? classes.animation : classes.animationClose)}>
      <div className={classes.logo_container} onClick={toggleOpen}>
        <img alt="MENU" src={MENU} className={classes.logo} />
        {open && (
          <div className={classes.selection_title_container}>
            <span className={classes.selection_title}>ma sélection</span>
          </div>
        )}
      </div>

      <div className={classes.themes_container}>
        {options.map(option => (
          <SelectThemeCard key={option.title} open={open} logo={option.resources.icon || CHECK} title={option.title} />
        ))}
      </div>
    </div>
  );
};
export default SideBarMobile;
