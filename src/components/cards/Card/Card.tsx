import React from 'react';
import check from '../../../assets/icons/check/ic-check-01.png';
import classes from './card.module.scss';
import classNames from '../../../utils/classNames';
interface Props {
  checked?: boolean;
}

const Card = ({ className, children, checked, ...other }: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <button className={classNames(classes.card, className)} {...other}>
    <img src={check} alt="checked" className={classes.check}/>
      <h1 className={classNames(classes.title, className)} {...other}>
        {children}
      </h1>
    </button>
  );
};

export default Card;
