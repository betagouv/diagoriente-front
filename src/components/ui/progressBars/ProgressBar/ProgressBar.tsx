import React from 'react';
import classes from './progressBar.module.scss';
import { progress } from '../../../../utils/getWidth';
import classNames from '../../../../utils/classNames';
interface IProps {
  width: number;
}

const ProgressBar = ({ width }: IProps) => {
  const styleWidth = progress(width);
  const style = {
    width: styleWidth,
  };
  const gray = {
    left: styleWidth,
  };
  return (
    <div className={classes.progress}>
      <div className={classes.progress_bar} style={style} />
      <div className={classes.background_bar} style={gray} />
    </div>
  );
};
export default ProgressBar;
