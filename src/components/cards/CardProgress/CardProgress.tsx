import React from 'react';
import ProgressBar from '../../ui/progressBars/ProgressBar/ProgressBar';
import { getProgress } from '../../../utils/getWidth';
import Logo from '../../../assets/images/bird.svg';
import classes from './progress.module.scss';
import classNames from '../../../utils/classNames';
type IProps = {
  progress: number;
};

const CardProgress = ({ progress }: IProps) => {
  const style = getProgress(progress);
  console.log(style.MARGIN)
  return (
    <div className={classes.container}>
      <ProgressBar width={progress} />
      <div className={classes.wrapper}>
        <div className={classNames(classes.Oval, style.STYLE)}>
          <div className={classes.triangle} />
          <img src={Logo} alt="bird" className={classes.Bitmap} />
        </div>
        <span className={classNames(classes.text, style.MARGIN)}>
          Tu passes au niveau {progress < 4 ? progress + 1 : progress} !
        </span>
      </div>
    </div>
  );
};
export default CardProgress;
