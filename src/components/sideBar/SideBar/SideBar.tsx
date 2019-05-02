import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import logo from '../../../assets/icons/logo/diagoriente-logo-01.png';
import logo2x from '../../../assets/icons/logo/diagoriente-logo-01@2x.png';
import logo3x from '../../../assets/icons/logo/diagoriente-logo-01@3x.png';
// components
import SelectThemeCard from '../../cards/CardSelectedThemes/SelectedThemeCard';

// style
import classes from './sideBar.module.scss';
type IProps = {
  options: { value: string }[];
} & RouteComponentProps;

const SideBar = ({ options, history }: IProps) => {
  const navigate = () => {
    history.push('/');
  };
  return (
    <div className={classes.container_sideBar}>
      <button className={classes.logo_container} onClick={navigate}>
        <img src={logo} srcSet={`${logo2x} 2x, ${logo3x} 3x`} className={classes.logo} />
      </button>
      <div className={classes.selection_title_container}>
        <span className={classes.selection_title}>ma sélection</span>
      </div>
      <div className={classes.themes_container}>
        {options.map(o => (
          <SelectThemeCard key={o.value} isSelected={false} title={o.value} />
        ))}
      </div>
    </div>
  );
};
export default withRouter(SideBar);