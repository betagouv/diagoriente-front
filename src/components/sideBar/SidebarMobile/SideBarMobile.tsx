import React from 'react';
import MENU from '../../../assets/icons/svg/menu.svg';
import CHECK from '../../../assets/icons/check/ic-check-01.png';
import classNames from '../../../utils/classNames';
// components
import SelectThemeCard from '../../cards/CardSelectedThemes/SelectedThemeCard';

// style
import classes from './sideBarMobile.module.scss';

type IProps = {
  options: { value: string }[];
  open: boolean;
  toggleOpen: () => void
}
const SideBarMobile = ({ options, open, toggleOpen }: IProps) => {

  return (
    <div className={classNames(classes.container_sideBar, open ? classes.animation : classes.animationClose)}>
      <div className={classes.logo_container} onClick={toggleOpen}>
        <img alt="MENU" src={MENU} className={classes.logo} />
        {open && <div className={classes.selection_title_container}>
          <span className={classes.selection_title}>ma sélection</span>
        </div>}
      </div>

      <div className={classes.themes_container}>
        {options.map(o => <SelectThemeCard key={o.value} open={open} logo={CHECK} title={o.value} />)}
      </div>

    </div>
  );
};
export default SideBarMobile;
