import React from 'react';
import ActivitiesCheck from '../checkboxs/ActivitiesCheck/ActivitiesCheck';
import classes from './Activity.module.scss';

interface State {}
interface Props {
  title: string;
  subTitle: string;
  selected: boolean;
  onCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}
const Activity = ({ title, subTitle, id, selected, onCheckChange }: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={classes.activityContainer}>
      <ActivitiesCheck id={id} selected={selected} onCheckChange={onCheckChange} tooltip={title} />
      <div className={classes.activityContentContainer}>
        <span className={classes.title}>{title}</span>
        <span className={classes.subtitle}>{subTitle}</span>
      </div>
    </div>
  );
};

export default Activity;
