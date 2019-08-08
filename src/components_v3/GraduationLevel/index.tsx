import React from 'react';
import classes from './GraduationLevel.module.scss';
import { getWidth } from '../../utils/getWidth';
import classNames from '../../utils/classNames';
import dot1 from '../../assets/icons/Dots/niveau1.png';
import dot2 from '../../assets/icons/Dots/niveau2.png';
import dot3 from '../../assets/icons/Dots/niveau3.png';
import dot4 from '../../assets/icons/Dots/niveau4.png';
import greyDot from '../../assets/icons/Dots/greyDot.svg';

interface IProps {
  level: number;
  color?: string;
  title?: string;
  sub_title?: string;
  withSub?: boolean;
}

const ProgressBarCompetence = ({
 level, color, title, sub_title, withSub,
}: IProps) => (
  <div className={classes.wrapper}>
    {level >= 1 ? (
      <div className={classes.dots} style={{ backgroundColor: color }} />
      ) : (
        <img className={classes.dots} src={greyDot} alt="dot" />
      )}
    {level >= 2 ? (
      <div className={classes.dots} style={{ backgroundColor: color }} />
      ) : (
        <img data-for={title} className={classes.dots} src={greyDot} alt="dot" />
      )}
    {level >= 3 ? (
      <div className={classes.dots} style={{ backgroundColor: color }} />
      ) : (
        <img className={classes.dots} src={greyDot} alt="dot" />
      )}
    {level >= 4 ? (
      <div className={classes.dots} style={{ backgroundColor: color }} />
      ) : (
        <img className={classes.dots} src={greyDot} alt="dot" />
      )}
    {withSub && <span className={classes.level}>{`NIVEAU${level}/4`}</span>}
  </div>
  );
export default ProgressBarCompetence;
