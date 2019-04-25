import React from 'react';

import classes from './withSub.module.scss';
import classNames from '../../../utils/classNames';

interface Props {
  title: string;
  subTitle: string;
}

const WithSub = ({ className, children, title, subTitle, ...other }: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={classNames(classes.container, className)} {...other}>
      <h1 className={classNames(classes.title, className)}>{title}</h1>
      <h5 className={classNames(classes.subtitle, className)}>{subTitle}</h5>
    </div>
  );
};

export default WithSub;
