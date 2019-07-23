import React from 'react';
import classes from './add.module.scss';
import add from '../../../assets_v3/icons/add/add.svg';
import classNames from '../../../utils/classNames';

interface Props {
  withtext?: boolean;
}

const Add = ({ className, withtext, ...other }: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={classNames(withtext ? classes.addWithText : classes.addWrapper, className)} {...other}>
      <img className={withtext ? classes.small : classes.addIcon} src={add} alt="ajouter" />
      {withtext && <span>AJOUTER</span>}
    </div>
  );
};
export default Add;
