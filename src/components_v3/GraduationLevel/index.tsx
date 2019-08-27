import React, { useState, ReactDOM } from 'react';
import ReactTooltip from 'react-tooltip';
import classes from './GraduationLevel.module.scss';

import greyDot from '../../assets/icons/Dots/greyDot.svg';
import whiteDot from '../../assets/icons/Dots/whiteDot.svg';

interface IProps {
  level: number;
  color?: string;
  title?: string;
  withSub?: boolean;
  index: number;
  taux?: number;
  description?: { title: string; sub_title?: string }[];
  handleChangeValue?: (value: number, index: number) => void;
}

const ProgressBarCompetence = ({
  level,
  color,
  title,
  withSub,
  taux,
  description,
  index,
  handleChangeValue,
}: IProps) => {
  const [Hover, setHover] = useState([false, false, false, false]);

  function onChange(value: number, nbr: number) {
    if (handleChangeValue) {
      handleChangeValue(value, nbr);
    }
  }
  function hoverHandler(e: any, value: number) {
    const hoverCopie = [false, false, false, false];
    console.log('hover in', value);

    for (let i = 0; i <= value; i++) {
      hoverCopie[i] = true;
    }
    setHover(hoverCopie);
  }
  function mouseLeaveHandler() {
    console.log('hover out');

    setHover([false, false, false, false]);
  }
  console.log('description', description);
  return (
    <div className={classes.wrapper}>
      {level >= 1 || Hover[0] ? (
        <div
          className={classes.dots}
          style={{ backgroundColor: color, cursor: taux ? 'pointer' : 'deafult' }}
          onClick={() => {
            onChange(1, index);
          }}
          onMouseLeave={mouseLeaveHandler}
          data-tip={description ? description[0].title : ''}
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
          onMouseEnter={e => {
            hoverHandler(e, 0);
          }}
          data-tip={description ? description[0].title : ''}
        />
      )}
      {level >= 2 || Hover[1] ? (
        <div
          className={classes.dots}
          style={{ backgroundColor: color, cursor: taux ? 'pointer' : 'deafult' }}
          onClick={() => {
            onChange(2, index);
          }}
          onMouseLeave={mouseLeaveHandler}
          data-tip={description ? description[1].title : ''}
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
          onMouseEnter={e => {
            hoverHandler(e, 1);
          }}
          onMouseLeave={mouseLeaveHandler}
          data-tip={description ? description[1].title : ''}
        />
      )}
      {level >= 3 || Hover[2] ? (
        <div
          className={classes.dots}
          style={{ backgroundColor: color, cursor: taux ? 'pointer' : 'deafult' }}
          onClick={() => {
            onChange(3, index);
          }}
          onMouseLeave={mouseLeaveHandler}
          data-tip={description ? description[2].title : ''}
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
          onMouseEnter={e => {
            hoverHandler(e, 2);
          }}
          onMouseLeave={mouseLeaveHandler}
          data-tip={description ? description[2].title : ''}
        />
      )}
      {level >= 4 || Hover[3] ? (
        <div
          className={classes.dots}
          style={{ backgroundColor: color, cursor: taux ? 'pointer' : 'deafult' }}
          onClick={() => {
            onChange(4, index);
          }}
          onMouseLeave={mouseLeaveHandler}
          data-tip={description ? description[3].title : ''}
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
          onMouseEnter={e => {
            hoverHandler(e, 3);
          }}
          onMouseLeave={mouseLeaveHandler}
          data-tip={description ? description[3].title : ''}
        />
      )}
      {withSub && <span className={classes.level}>{`NIVEAU${level}/4`}</span>}
      {description && <ReactTooltip place="top" type="light" />}
    </div>
  );
};

export default ProgressBarCompetence;
