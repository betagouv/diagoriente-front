import React from 'react';
import ProgressBar from '../../ui/progressBars/ProgressBar/ProgressBar';
import { getProgress } from '../../../utils/getWidth';
import Logo from '../../../assets/images/bird.svg';
import classes from './progress.module.scss';
type IProps = {
  progress: number;
};

const CardProgress = ({ progress }: IProps) => {
  const Style = getProgress(progress);
  console.log(Style);
  return (
    <div className={classes.container}>
      <ProgressBar width={progress} />
      <div className={classes.wrapper}>
        <div className={classes.Oval} style={Style.STYLE}>
          <div className={classes.triangle} />
          <img src={Logo} alt="bird" className={classes.Bitmap} />
        </div>
        <span className={classes.text} style={Style.MARGIN}>
          Tu passes au niveau {progress < 4 ? progress + 1 : progress} !
        </span>
      </div>
    </div>
  );
};
export default CardProgress;
