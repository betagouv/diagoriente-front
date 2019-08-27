import React from 'react';
import JobIcon from 'components_v3/icons/jobIcon/jobIcon';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import classNames from 'utils/classNames';
import classes from './jobselection.module.scss';

interface Props {
  title: string;
  onRemove?: () => void;
  children?: React.ReactChild;
}

const JobSelection = ({
  title,
  onRemove,
  className,
  children,
  ...other
}: Props & React.HTMLAttributes<HTMLElement>) => (
  <div className={classNames(classes.container, className)} {...other}>
    <div className={classes.iconContainer}>
      <JobIcon width="20" height="20" />
    </div>
    <div className={classes.titleContainer}>
      <span className={classes.jobTitle}>{title}</span>
    </div>
    {children}
  </div>
);
export default JobSelection;
