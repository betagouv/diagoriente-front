import React from 'react';
import arrow from 'assets_v3/Home/Picto_Fleche.svg';
import classNames from 'utils/classNames';
import classes from './indexList.module.scss';

interface Props {
  index: number;
  isLast: number;
}

const indexList = ({ index, isLast }: Props) => {
  return (
    <div className={classes.container}>
      <span className={classes.indexNumber}>{index}</span>
      <div className={classes.arrowsContainer}>
        {index > 1 && (
          <img src={arrow} alt="arrow" className={classNames(classes.arrow, classes.arrowUp)} />
        )}
        {index !== isLast && (
          <img src={arrow} alt="arrow" className={classNames(classes.arrow, classes.arrowDown)} />
        )}
      </div>
    </div>
  );
};
export default indexList;
