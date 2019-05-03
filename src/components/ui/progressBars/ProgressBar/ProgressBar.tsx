import React from 'react';
import classes from './progressBar.module.scss';

interface IProps {
  width: number;
}

const ProgressBar = ({ width }: IProps) => {
  let WIDTH: string = '';
  switch (width) {
    case 1:
      WIDTH = '25%';
      break;
    case 2:
      WIDTH = '50%';
      break;
    case 3:
      WIDTH = '75%';
      break;
    case 4:
      WIDTH = '100%';
      break;
  }

  const style = {
    width: WIDTH,
  };
  const gray = {
    left: WIDTH,
  };
  return (
    <div className={classes.progress}>
      <div className={classes.progress_bar} style={style} />
      <div className={classes.background_bar} style={gray} />
    </div>
  );
};
export default ProgressBar;
