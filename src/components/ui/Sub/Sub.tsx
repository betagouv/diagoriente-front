import React from 'react';
import classes from './withSub.module.scss';
import classNames from '../../../utils/classNames';

interface Props {
  title1: string;
  subTitle?: string;
  title2?: string;
  titleIcon?: string;
}

const WithSub = ({
  className,
  children,
  title1,
  title2,
  titleIcon,
  subTitle,
  ...other
}: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={classNames(className)} {...other}>
      <div className={classes.titleContainer}>
        <h1 className={classNames(classes.title)}>{title1}</h1>
        <img className={classes.titleIcon} src={titleIcon} />
        <h1 className={classNames(classes.title)}>{title2}</h1>
      </div>
      <h5 className={classNames(classes.subtitle)}>{subTitle}</h5>
    </div>
  );
};

export default WithSub;
