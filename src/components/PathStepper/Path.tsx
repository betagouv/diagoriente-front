import React from 'react';
import classes from './path.module.scss';
import classNames from '../../utils/classNames';

interface IProps {
  options: string[];
  onClick: (index: number, p: string) => void;
  type?: string;
}

const PathStepper = ({ options, onClick, type }: IProps) => (
  <div className={classes.container}>
    {['Accueil', ...options].map((p, index, array) => {
      const isLast = index === array.length - 1;

      return (
        <div key={p} className={classes.item_container}>
          <div
            onClick={() => onClick(index, p)}
            className={classNames(
              isLast ? (type === 'professional' ? classes.item_selected_pro : classes.item_selected) : classes.item,
            )}
          >
            {p}
          </div>
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
