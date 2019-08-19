import React from 'react';
import JobIcon from 'components_v3/icons/jobIcon/jobIcon';
import classNames from 'utils/classNames';
import classes from './jobCard.module.scss';

interface Props {
  rating?: 1 | 2 | 3;
  color?: string;
}

const JobCard = ({ rating, color, className }: React.HTMLAttributes<HTMLElement> & Props) => (
  <div className={classNames(classes.card, className)}>
    <div className={classes.cupContainer}>
      <JobIcon width="55" height="55" rating={rating} color={color} />
      <span className={classes.jobName} style={{ color }}>
        Technicien en application industrielle
      </span>
    </div>
    <div className={classes.description}>
      <span className={classes.descriptionText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ex magna.
      </span>
    </div>
    <div className={classes.activities}>activities</div>
    <div className={classes.niveau}>
      <span>Niveau d’accès au métier :</span>
      <span>BAC PRO</span>
    </div>
  </div>
);
export default JobCard;
