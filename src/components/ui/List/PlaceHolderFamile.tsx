import React from 'react';

import classes from './placeholder.module.scss';
interface IProps {
  index?: number;
}
const PlaceHolderFamile = ({ index }: IProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.logo_container}>
        <img className={classes.logo} />
        <div className={classes.badge_container}>
          <div className={classes.badge}>{index}</div>
        </div>
      </div>
      <div className={classes.description_container}>
        <div className={classes.text} />
        <div className={classes.text_1} />
        <div className={classes.text_2} />
      </div>
    </div>
  );
};
export default PlaceHolderFamile;
