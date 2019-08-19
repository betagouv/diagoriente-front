import React from 'react';
import JobIcon from 'components_v3/icons/jobIcon/jobIcon';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import classes from './jobselection.module.scss';

interface Props {
  title: string;
  withRemove?: boolean;
  onRemove?: () => void;
}

const JobSelection = ({
  title,
  withRemove,
  onRemove,
  className,
  ...other
}: Props & React.HTMLAttributes<HTMLElement>) => (
  <div className={classes.container} {...other}>
    <div className={classes.iconContainer}>
      <JobIcon width="20" height="20" />
    </div>
    <div className={classes.titleContainer}>
      <span className={classes.jobTitle}>{title}</span>
    </div>
    {withRemove && <MultiIcon type="remove" width="22" height="22" className={classes.remove} onClick={onRemove} />}
  </div>
);
export default JobSelection;
