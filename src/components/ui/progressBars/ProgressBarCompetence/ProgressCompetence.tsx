import React from 'react';
import classes from './progressCompetence.module.scss';

interface IProps {
  width: number;
  color?: string;
}

const ProgressBarCompetence = ({ width, color }: IProps) => {
  let WIDTH: string = '';
  switch (width) {
    case 0:
      WIDTH = '0px';
      break;
    case 1:
      WIDTH = '25px';
      break;
    case 2:
      WIDTH = '50px';
      break;
    case 3:
      WIDTH = '75px';
      break;
    case 4:
      WIDTH = '100px';
      break;
  }

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
