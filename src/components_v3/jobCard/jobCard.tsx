import React from 'react';
import JobIcon from 'components_v3/icons/jobIcon/jobIcon';
import classNames from 'utils/classNames';
import classes from './jobCard.module.scss';

interface Props {
  rating?: 0 | 1 | 2 | 3;
  color?: string;
  jobName?: string;
  jobDescription?: string;
  jobInterest?: any;
  jobAccessebility?: string;
}

const JobCard = ({
  rating,
  color,
  jobName,
  jobAccessebility,
  jobDescription,
  jobInterest,
  className,
  ...other
}: React.HTMLAttributes<HTMLElement> & Props) => (
  <div className={classNames(classes.card, className)} {...other}>
    <div className={classes.cupContainer}>
      <JobIcon width="55" height="55" rating={rating} color={color} className={classes.width} />
      <span className={classes.jobName} style={{ color }}>
        {jobName}
      </span>
    </div>
    <div className={classes.description}>
      <span className={classes.descriptionText}>{jobDescription}</span>
    </div>
    <div className={classes.activities}>
      {jobInterest.map((el: any, index: any) => {
        const name = el._id.nom.split('/');
        // console.log(name)
        return (
          index <= 2 && (
            <React.Fragment>
              <div className={classes.interestWrapper}>
                <span className={classes.number} style={{ color }}>
                  {index + 1}
                </span>
                {name.map((title: string) => (
                  <span className={classes.titleInterest}>{title}</span>
                ))}
              </div>
              {index <= 1 && <div className={classes.verticalLine} />}
            </React.Fragment>
          )
        );
      })}
    </div>
    <div className={classes.niveau}>
      <span className={classes.titleInterest}>Niveau d’accès au métier :</span>
      <span className={classes.niveauText}>{jobAccessebility}</span>
    </div>
  </div>
);
export default JobCard;
