import React from 'react';

import classNames from '../../../utils/classNames';
import classes from './stepCard.module.scss';

interface Props {
  circleComponent?: React.ReactNode;
  headerComponent?: React.ReactNode;
  title?: string;
  description?: string;
  footerComponent?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  classes: {
    root?: string;
    disabled?: string;
    header?: string;
    content?: string;
    circle?: string;
    title?: string;
    description?: string;
    footer?: string;
  };
}

const StepCard = ({
  circleComponent,
  headerComponent,
  title,
  description,
  footerComponent,
  disabled,
  className,
  classes: classesProps,
}: Props) => (
  <div className={classNames(classes.container, className, classesProps.root)}>
    {headerComponent && <div className={classNames(classes.header, classesProps.header)}>{headerComponent}</div>}
    <div className={classNames(classes.content, classesProps.content)}>
      <div className={classNames(classes.circle, classesProps.circle)}>{circleComponent}</div>
      {title && <div className={classNames(classes.title, classesProps.title)}>{title}</div>}
      {description && <div className={classNames(classes.description, classesProps.description)}>{description}</div>}
      {footerComponent}
    </div>
    {disabled && <div className={classNames('absolute_fill', classes.disabled, classesProps.disabled)} />}
  </div>
);

StepCard.defaultProps = {
  classes: {},
};

export default StepCard;
