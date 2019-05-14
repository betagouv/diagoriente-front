import React from 'react';
import check from '../../../assets/icons/check/ic-check-01.png';
import classes from './card.module.scss';
import classNames from '../../../utils/classNames';

interface Props {
  checked?: boolean;
  type?: string;
}

const Card = ({ className, children, checked, type, ...other }: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={classNames(classes.container, checked && classes.container_focus)}>
      <button
        className={classNames(
          type === 'professional' ? classes.card_pro : classes.card,
          checked ? type === 'professional' ? classes.card_pro_focus : classes.card_focus : className ,
          className,
        )}
        {...other}
      >
        <img src={check} alt="checked" className={classes.check} />
        <span className={classNames(classes.title, checked && classes.title_focus, className)} {...other}>
          {children}
        </span>
      </button>
    </div>
  );
};

export default Card;
