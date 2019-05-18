import React from 'react';
import classes from './progressCompetence.module.scss';
import { getWidth } from '../../../../utils/getWidth';
import classNames from '../../../../utils/classNames';

interface IProps {
  width: number;
  color?: string;
}

const ProgressBarCompetence = ({ width, color }: IProps) => {
  const classe = getWidth(width);
  const renderIndicator = () => (
    <div className={classes.indicator_container}>
      <div className={classes.indicator_1} />
      <div className={classes.indicator_2} />
      <div className={classes.indicator_3} />
    </div>
  );

  return (
    <div className={classes.progress_competence}>
    {renderIndicator()}
      <div className={classNames(classes.progress_bar_competence, classe)} />
      <div className={classes.background_bar_competence} />
    </div>
  );
};
export default ProgressBarCompetence;
