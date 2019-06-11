import React from 'react';
import classes from './progressCompetence.module.scss';
import { getWidth } from '../../../../utils/getWidth';
import classNames from '../../../../utils/classNames';
import dot1 from '../../../../assets/icons/Dots/dot1.svg';
import dot2 from '../../../../assets/icons/Dots/dot2.svg';
import dot3 from '../../../../assets/icons/Dots/dot3.svg';
import dot4 from '../../../../assets/icons/Dots/dot4.svg';

interface IProps {
  width: number;
  color?: string;
}

const ProgressBarCompetence = ({ width, color }: IProps) => {
  // const classe = getWidth(width);
  

  return (
    <div className={classes.wrapper}>
      {width >= 1 && <img className={classes.dots} src={dot1} />}
      {width >= 2 && <img className={classes.dots} src={dot2} />}
      {width >= 3 && <img className={classes.dots}  src={dot3} />}
      {width >= 4 && <img className={classes.dots}  src={dot4} />}
    </div>
  );
};
export default ProgressBarCompetence;
