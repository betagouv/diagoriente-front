import React, { useState } from 'react';
import classes from './GraduationLevel.module.scss';

import greyDot from '../../assets/icons/Dots/greyDot.svg';
import whiteDot from '../../assets/icons/Dots/whiteDot.svg';

interface IProps {
  level: number;
  color?: string;
  title?: string;
  sub_title?: string;
  withSub?: boolean;
  index: number;
  taux?: number;
  handleChangeValue?: (value: number, index: number) => void;
}

const ProgressBarCompetence = ({
  level,
  color,
  title,
  sub_title,
  withSub,
  taux,
  index,
  handleChangeValue,
}: IProps) => {
  const [Hover, setHover] = useState([false, false, false, false]);

  function onChange(value: number, nbr: number) {
    if (handleChangeValue) {
      handleChangeValue(value, nbr);
    }
  }
  return (
    <div className={classes.wrapper}>
      {level >= 1 || Hover[0] ? (
        <div
          className={classes.dots}
          style={{ backgroundColor: color, cursor: taux ? 'pointer' : 'deafult' }}
          onClick={() => {
            onChange(1, index);
          }}
        />
      ) : (
        <img
          className={classes.dots}
          src={index && index % 2 ? whiteDot : greyDot}
          alt="dot"
          style={{ cursor: taux ? 'pointer' : 'deafult' }}
          onClick={() => {
            onChange(1, index);
          }}
        />
      )}
      {level >= 2 || Hover[1] ? (
        <div
          className={classes.dots}
          style={{ backgroundColor: color, cursor: taux ? 'pointer' : 'deafult' }}
          onClick={() => {
            onChange(2, index);
          }}
        />
      ) : (
        <img
          data-for={title}
          className={classes.dots}
          src={index && index % 2 ? whiteDot : greyDot}
          style={{ cursor: taux ? 'pointer' : 'deafult' }}
          alt="dot"
          onClick={() => {
            onChange(2, index);
          }}
        />
      )}
      {level >= 3 || Hover[2] ? (
        <div
          className={classes.dots}
          style={{ backgroundColor: color, cursor: taux ? 'pointer' : 'deafult' }}
          onClick={() => {
            onChange(3, index);
          }}
        />
      ) : (
        <img
          className={classes.dots}
          src={index && index % 2 ? whiteDot : greyDot}
          style={{ cursor: taux ? 'pointer' : 'deafult' }}
          alt="dot"
          onClick={() => {
            onChange(3, index);
          }}
        />
      )}
      {level >= 4 || Hover[3] ? (
        <div
          className={classes.dots}
          style={{ backgroundColor: color, cursor: taux ? 'pointer' : 'deafult' }}
          onClick={() => {
            onChange(4, index);
          }}
        />
      ) : (
        <img
          className={classes.dots}
          src={index && index % 2 ? whiteDot : greyDot}
          style={{ cursor: taux ? 'pointer' : 'deafult' }}
          alt="dot"
          onClick={() => {
            onChange(4, index);
          }}
        />
      )}
      {withSub && <span className={classes.level}>{`NIVEAU${level}/4`}</span>}
    </div>
  );
};

export default ProgressBarCompetence;
