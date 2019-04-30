import React from 'react';
import classes from './stepCard.module.scss';

interface Props {
  circleComponent?: React.ReactNode;
}

const StepCard = ({ circleComponent }: Props) => (
  <div className={classes.container}>
    <div className={classes.header} />
    <div className={classes.content}>
      <div className={classes.circle}>{circleComponent}</div>
    </div>
  </div>
);

export default StepCard;
