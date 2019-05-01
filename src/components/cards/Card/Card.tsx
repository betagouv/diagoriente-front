import React from 'react';
import check from '../../../assets/icons/check/ic-check-01.png';
import classes from './card.module.scss';
import classNames from '../../../utils/classNames';
import { spawn } from 'redux-saga/effects';
interface Props {
  checked?: boolean;
}

const Card = ({ className, children, checked, ...other }: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <button className={classNames(classes.card, checked ? classes.card_focus : '', className)} {...other}>
      <img src={check} alt="checked" className={classes.check} />
      <span className={classNames(classes.title, checked ? classes.title_focus : '', className)} {...other}>
        {children}
      </span>
    </button>
  );
};

export default Card;
