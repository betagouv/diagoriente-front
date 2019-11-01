import React from 'react';
import arrow from 'assets_v3/Home/Picto_Fleche.svg';
import classNames from 'utils/classNames';
import classes from './indexList.module.scss';

interface Props {
  index: number;
  isLast: number;
  onChangeTo: (direction: string, index: number) => void;
}

const indexList = ({ index, isLast, onChangeTo }: Props) => (
  <div className={classes.container}>
    <span className={classes.indexNumber}>{index + 1}</span>
    <div className={classes.arrowsContainer}>
      {index > 0 && (
        <img
          src={arrow}
          alt="arrow"
          className={classNames(classes.arrow, classes.arrowUp)}
          onClick={() => onChangeTo('TOP', index)}
        />
      )}
      {index !== isLast && (
        <img
          src={arrow}
          alt="arrow"
          className={classNames(classes.arrow, classes.arrowDown)}
          onClick={() => onChangeTo('DOWN', index)}
        />
      )}
    </div>
  </div>
);
export default indexList;
