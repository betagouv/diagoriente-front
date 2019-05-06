import React from 'react';
import classes from './progressCompetence.module.scss';
import { getWidth } from '../../../../utils/getWidth';

interface IProps {
  width: number;
  color?: string;
}

const ProgressBarCompetence = ({ width, color }: IProps) => {
  const WIDTH = getWidth(width);
  const style = {
    width: WIDTH,
  };
  return (
    <div className={classes.progress_competence}>
      <div className={classes.progress_bar_competence} style={style} />
      <div className={classes.background_bar_competence} />
    </div>
  );
};
export default ProgressBarCompetence;
