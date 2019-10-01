import React from 'react';
import JobIcon from 'components_v3/icons/jobIcon/jobIcon';
import classNames from 'utils/classNames';
import classes from './jobselection.module.scss';

interface Props {
  title: string;
  onRemove?: () => void;
  children?: React.ReactChild;
  big?: boolean;
}

const JobSelection = ({
  title,
  onRemove,
  className,
  children,
  big,
  ...other
}: Props & React.HTMLAttributes<HTMLElement>) => (
  <div className={classNames(classes.container, className)} {...other}>
    <div className={classes.iconContainer}>
      <JobIcon width="20" height="20" />
    </div>
    <div className={classes.titleContainer} style={big ? { marginLeft: 0 } : {}}>
      <span className={classes.jobTitle}>{title}</span>
    </div>
    {children}
  </div>
);
export default JobSelection;
