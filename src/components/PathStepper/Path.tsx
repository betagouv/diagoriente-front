import React from 'react';
import classes from './path.module.scss';
import classNames from '../../utils/classNames';

interface IProps {
  options: string[];
}

const PathStepper = ({ options }: IProps) => (
  <div className={classes.container}>
    {['Accueil', ...options].map((p, index, array) => {
      const isLast = index === array.length - 1;

      return (
        <div key={p} className={classes.item_container}>
          <div className={classNames(isLast ? classes.item_selected : classes.item)}>{p}</div>
          {!isLast && <div className={classes.item}>></div>}
        </div>
      );
    })}
  </div>
);

PathStepper.defaultProps = {
  options: [],
};
export default PathStepper;
