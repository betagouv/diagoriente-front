import React from 'react';
import classes from './question.module.scss';
import classNames from '../../../utils/classNames';

const QuestionMarks = ({ className, children, ...other }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className={classNames(classes.container, className)} {...other}>
      <div className={classes.mark1} />
      <div className={classes.mark2} />
      <div className={classes.mark3} />
    </div>
  );
};

export default QuestionMarks;
