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

import cross from '../../../assets/icons/svg/cross.svg';

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
  onItemRemove?: (item: T) => void;
  numberOfLine?: number;
} & RouteComponentProps<{ id: string }>;

const SideBar = <T extends Option>({
  options,
  history,
  type,
  disabled,
  title,
  onItemClick,
  onItemRemove,
  numberOfLine,
}: IProps<T>) => {
  const navigate = (path: string) => () => {
    history.replace(path);
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

          const remove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation();
            (onItemRemove as (item: T) => void)(o);
          };

          return (
            <SelectThemeCard
              onClick={disabled ? undefined : click}
              key={o._id}
              isSelected={o.isSelected}
              title={o.title}
              themetype={type}
              numberOfLine={numberOfLine}
            >
              {!disabled && onItemRemove && (
                <div onClick={remove} className={classes.remove_button}>
                  <img src={cross} height={12} width={12} />
                </div>
              )}
            </SelectThemeCard>
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
