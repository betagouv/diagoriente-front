import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import classNames from 'utils/classNames';
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
  modeShowOnly?: boolean;
  handleChangeValue?: (value: number, index: number) => void;
}

const ProgressBarCompetence = ({
  level,
  color,
  title,
  withSub,
  taux,
  description,
  modeShowOnly,
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

    for (let i = 0; i <= value; i += 1) {
      hoverCopie[i] = true;
    }
    setHover(hoverCopie);
  }
  function mouseLeaveHandler() {
    setHover([false, false, false, false]);
  }
  function DoNothing() {}
  function conditionHover(dotIndex: number) {
    if (modeShowOnly) {
      if (level >= dotIndex && taux !== 0) {
        return true;
      }
      return false;
    }
    if (taux !== 0) {
      return true;
    }
    return false;
  }
  function renderDot(dotIndex: number) {
    return (
      <div
        className={classes.dots}
        onClick={() => {
          onChange(dotIndex, index);
        }}
        onMouseLeave={mouseLeaveHandler}
        onMouseEnter={e => {
          conditionHover(dotIndex) ? hoverHandler(e, dotIndex - 1) : DoNothing();
        }}
        data-tip={description ? description[dotIndex - 1].title : ''}
      >
        <img
          data-for={title}
          className={classNames(classes.img)}
          src={index && index % 2 ? whiteDot : greyDot}
          alt="dot"
          style={{ cursor: taux ? 'pointer' : 'deafult' }}
          onClick={() => {
            onChange(dotIndex, index);
          }}
        />
        <div
          className={classNames(
            classes.img,
            !(level >= dotIndex || Hover[dotIndex - 1]) && classes.dots_hide,
          )}
          style={{ backgroundColor: color, cursor: taux ? 'pointer' : 'deafult' }}
        />
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      {renderDot(1)}
      {renderDot(2)}
      {renderDot(3)}
      {renderDot(4)}
      {withSub && <span className={classes.level}>{`NIVEAU${level}/4`}</span>}
      {description && <ReactTooltip place="top" type="light" />}
    </div>
  );
};

export default ProgressBarCompetence;
