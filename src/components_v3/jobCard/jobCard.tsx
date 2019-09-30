import React from 'react';
import JobIcon from 'components_v3/icons/jobIcon/jobIcon';
import Button from 'components_v3/button/button';
import classNames from 'utils/classNames';
import classes from './jobCard.module.scss';

interface Props {
  rating?: 0 | 1 | 2 | 3;
  color?: string;
  jobName?: string;
  jobDescription?: string;
  jobInterest?: any;
  jobAccessebility?: string;
  modal: () => void;
  add: () => void;
  selected?: boolean;
}

const JobCard = ({
  rating,
  color,
  jobName,
  jobAccessebility,
  jobDescription,
  jobInterest,
  className,
  modal,
  add,
  selected,
  ...other
}: React.HTMLAttributes<HTMLElement> & Props) => (
  <div className={classNames(classes.card, className)} {...other}>
    <div className={classes.cupContainer}>
      <JobIcon
        width="55"
        height="55"
        rating={rating}
        color={color}
        iconColor="#ff0060"
        className={classes.width}
      />
      <span className={classes.jobName} style={{ color: '#757778' }}>
        {jobName}
      </span>
    </div>
    <div className={classes.description}>
      <span className={classes.descriptionText}>{jobDescription}</span>
    </div>
    {/* <div className={classes.activities}>
      {jobInterest.map((el: any, index: any) => {
        const name = el._id.nom.split('/');
        return (
          index <= 2 && (
            <React.Fragment key={el._id.nom}>
              <div className={classes.interestWrapper}>
                <span className={classes.number} style={{ color }}>
                  {index + 1}
                </span>
                {name.map((title: string) => (
                  <span className={classes.titleInterest} key={title}>{title}</span>
                ))}
              </div>
              {index <= 1 && <div className={classes.verticalLine} />}
            </React.Fragment>
          )
        );
      })}
    </div> */}

    <div className={classes.niveau}>
      <span className={classes.titleInterest}>Niveau d’accès au métier :</span>
      <span className={classes.niveauText}>{jobAccessebility}</span>
    </div>
    <div className={classes.buttonsContainer}>
      <Button title="EN SAVOIR PLUS" color="blue" style={{ height: 50 }} onClick={modal} />
      <Button
        title="AJOUTER À MA SÉLECTION"
        color="red"
       // type={selected ? 'checked' : undefined}
        className={classes.redButtonAdd}
        onClick={add}
      />
    </div>
  </div>
);
export default JobCard;
