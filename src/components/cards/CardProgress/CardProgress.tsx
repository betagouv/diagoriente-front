import React from 'react';
import ProgressBar from '../../ui/progressBars/ProgressBar/ProgressBar';
import Logo from '../../../assets/images/bird.svg';
import classes from './progress.module.scss';
type IProps = {
  progress: number;
};
type style = {
  padding: string;
  left: string;
};
type IStyle = {
  marginLeft: string;
};

const CardProgress = ({ progress }: IProps) => {
  let STYLE: style = { padding: '', left: '' };
  let MARGIN: IStyle = { marginLeft: '0px' };
  switch (progress) {
    case 1:
      STYLE = {
        padding: '10px',
        left: '12.5%',
      };
      MARGIN = {
        marginLeft: '50px',
      };
      break;
    case 2:
      STYLE = {
        padding: '15px',
        left: '25%',
      };
      MARGIN = {
        marginLeft: '90px',
      };
      break;
    case 3:
      STYLE = {
        padding: '15px',
        left: '50%',
      };
      MARGIN = {
        marginLeft: '-55px',
      };
      break;
    case 4:
      STYLE = {
        padding: '20px',
        left: '75%',
      };
      MARGIN = {
        marginLeft: '0px',
      };
      break;
  }
  return (
    <div className={classes.container}>
      <ProgressBar width={progress} />
      <div className={classes.wrapper}>
        <div className={classes.Oval} style={STYLE}>
          <div className={classes.triangle} />
          <img src={Logo} alt="bird" className={classes.Bitmap} />
        </div>
        <span className={classes.text} style={MARGIN}>
          Tu passes au niveau {progress < 4 ? progress + 1 : progress} !
        </span>
      </div>
    </div>
  );
};
export default CardProgress;
