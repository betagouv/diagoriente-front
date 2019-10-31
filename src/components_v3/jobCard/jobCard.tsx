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
  jobNiveau?: string;
  modal: () => void;
  add: () => void;
  selected?: string;
  all?: any;
}

const JobCard = ({
  rating,
  color,
  jobName,
  jobAccessebility,
  jobNiveau,
  jobDescription,
  jobInterest,
  className,
  modal,
  add,
  selected,
  all,
  ...other
}: React.HTMLAttributes<HTMLElement> & Props) => {
  //  console.log(all, "selected", selected)
  const index = all.map((el: any) => el.job._id).find((el: any) => el === selected);
  //  console.log(index);
  return (
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
      <div className={classes.niveau}>
        <span className={classes.titleInterest}>Niveau d’accès au métier :</span>
        <span className={classes.niveauText}>{jobNiveau || jobAccessebility}</span>
      </div>
      <div className={classes.buttonsContainer}>
        <Button title="EN SAVOIR PLUS" color="blue" style={{ height: 50 }} onClick={modal} />
        <Button
          title={index ? 'ajouté' : 'AJOUTER À MA SÉLECTION'}
          color={index ? 'redFilled' : 'red'}
          type={index ? 'checked' : undefined}
          className={classes.redButtonAdd}
          onClick={add}
        />
      </div>
    </div>
  );
};
export default JobCard;
