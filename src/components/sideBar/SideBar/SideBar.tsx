import React from 'react';
import LOGO from '../../assets/icons/logo/diagoriente-logo-01.png';
// components
import SelectThemeCard from '../../cards/CardSelectedThemes/SelectedThemeCard';

// style
import classes from './sideBar.module.scss';


type IProps = {
    options: { value: string }[];
}
const SideBar = ({ options }: IProps) => {

    return (
        <div className={classes.container_sideBar}>
            <div className={classes.logo_container}>
                <img alt='logo' className={classes.logo} />
            </div>
            <div className={classes.selection_title_container}>
                <span className={classes.selection_title}>ma sélection</span>
            </div>
            <div className={classes.themes_container}>
                {options.map(o => <SelectThemeCard title={o.value} />)}
            </div>

        </div>
    )
}
export default SideBar;