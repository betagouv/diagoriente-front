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
import { ITheme, ReduxState, IActivity } from 'reducers';

interface Option extends ITheme {
  isSelected?: boolean;
}

interface MapToProps {
  lastIndex: number;
}

type IProps = {
  options: Option[];
} & RouteComponentProps<{ id: string }> &
  MapToProps;

const SideBar = ({ options, history, lastIndex }: IProps) => {
  const navigate = (path: string) => () => {
    history.push(path);
  };

  return (
    <div className={classes.container_sideBar}>
      <button className={classes.logo_container} onClick={navigate('/')}>
        <img src={logo} srcSet={`${logo2x} 2x, ${logo3x} 3x`} className={classes.logo} />
      </button>
      <div className={classes.selection_title_container}>
        <span className={classes.selection_title}>ma sélection</span>
      </div>
      <div className={classes.themes_container}>
        {options.map((o, i) => {
          const disabled = !(lastIndex > 0 && i <= lastIndex);
          return (
            <SelectThemeCard
              onClick={navigate(`/theme/${o._id}/activities`)}
              key={o._id}
              isSelected={o.isSelected}
              title={o.title}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ parcours }: ReduxState): MapToProps => ({
  lastIndex: parcours.lastIndex,
});

export default connect(mapStateToProps)(withRouter(SideBar));
