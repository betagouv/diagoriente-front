import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

// assets
import logo from '../../../assets/icons/logo/diagoriente-logo-01.png';
import logo2x from '../../../assets/icons/logo/diagoriente-logo-01@2x.png';
import logo3x from '../../../assets/icons/logo/diagoriente-logo-01@3x.png';
// components
import SelectThemeCard from '../../cards/CardSelectedThemes/SelectedThemeCard';

// style
import classes from './sideBar.module.scss';

interface Option {
  _id: string;
  title: string;
  isSelected?: boolean;
}

type IProps<T extends Option> = {
  options: T[];
  disabled?: boolean;
  type?: string;
  title?: string;
  onItemClick?: (item: T) => void;
} & RouteComponentProps<{ id: string }>;

const SideBar = <T extends Option>({ options, history, type, disabled, title, onItemClick }: IProps<T>) => {
  const navigate = (path: string) => () => {
    history.push(path);
  };
  return (
    <div className={classes.container_sideBar}>
      <button className={classes.logo_container} onClick={navigate('/profile')}>
        <img src={logo} srcSet={`${logo2x} 2x, ${logo3x} 3x`} className={classes.logo} />
      </button>
      <div className={classes.selection_title_container}>
        <span className={classes.selection_title}>{title}</span>
      </div>
      <div className={classes.themes_container}>
        {options.map((o, i) => {
          const click = () => {
            if (onItemClick) {
              onItemClick(o);
            } else {
              navigate(`/theme/${o._id}/activities`)();
            }
          };
          return (
            <SelectThemeCard
              onClick={disabled ? undefined : click}
              key={o._id}
              isSelected={o.isSelected}
              title={o.title}
              themetype={type}
            />
          );
        })}
      </div>
    </div>
  );
};

SideBar.defaultProps = {
  title: 'ma sélection',
};

export default withRouter(SideBar);
