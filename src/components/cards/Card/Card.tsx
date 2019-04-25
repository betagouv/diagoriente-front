import React from 'react';

import classes from './card.module.scss';
import classNames from '../../../utils/classNames';

const Card = ({ className, children, ...other }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className={classNames(classes.card, className)} {...other}>
      <h1 className={classNames(classes.title, className)} {...other}>
        {children}
      </h1>
    </div>
  );
};

export default Card;
