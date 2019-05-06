import React from 'react';
import check from '../../../assets/icons/check/ic-check-01.png';
import classes from './card.module.scss';
import classNames from '../../../utils/classNames';

interface Props {
  checked?: boolean;
}

const Card = ({ className, children, checked, ...other }: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={classNames(classes.container, checked && classes.container_focus)}>
      <button className={classNames(classes.card, checked && classes.card_focus, className)} {...other}>
        <img src={check} alt="checked" className={classes.check} />
        <span className={classNames(classes.title, checked && classes.title_focus, className)} {...other}>
          {children}
        </span>
      </button>
    </div>
  );
};

export default Card;
