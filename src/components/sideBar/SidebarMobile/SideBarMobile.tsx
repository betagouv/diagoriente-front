import React from 'react';

// types
import { ITheme } from 'reducers';
// components
import SelectThemeCard from '../../cards/CardSelectedThemes/SelectedThemeCard';

// icons
import MENU from '../../../assets/icons/svg/menu.svg';
import MENUPro from '../../../assets/icons/svg/menu_pro.svg';
import CHECK from '../../../assets/icons/check/ic-check-01.png';

// style
import classNames from '../../../utils/classNames';
import classes from './sideBarMobile.module.scss';

type IProps = {
  options: ITheme[];
  open: boolean;
  toggleOpen: () => void;
  type?: string;
};
const SideBarMobile = ({ options, open, toggleOpen, type }: IProps) => {
  return (
    <div className={classNames(classes.container_sideBar, open ? classes.animation : classes.animationClose)}>
      <div className={classes.logo_container} onClick={toggleOpen}>
        <img alt="MENU" src={type === 'professional' ? MENUPro : MENU} className={classes.logo} />
        {open && (
          <div className={classes.selection_title_container}>
            <span className={classes.selection_title}>ma sélection</span>
          </div>
        )}
      </div>

      <div className={classes.themes_container}>
        {options.map(option => (
          <SelectThemeCard
            key={option.title}
            open={open}
            logo={option.resources ? option.resources.icon : CHECK}
            title={option.title}
            themetype={type}
          />
        ))}
      </div>
    </div>
  );
};
export default SideBarMobile;
