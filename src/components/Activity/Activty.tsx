import React from 'react';
import ActivitiesCheck from '../checkboxs/ActivitiesCheck/ActivitiesCheck';
import classes from './Activity.module.scss';

interface State {}
interface Props {
  title: string;
  subTitle: string;
  selected: boolean;
  OnCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}
const Activity = ({ title, subTitle, id, selected, OnCheckChange }: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={classes.activityContainer}>
      <ActivitiesCheck id={id} selected={selected} OnCheckChange={OnCheckChange} tooltip={title} />
      <div className={classes.activityContentContainer}>
        <span className={classes.title}>{title}</span>
        <span className={classes.subtitle}>{subTitle}</span>
      </div>
    </div>
  );
};

/* class Activity extends React.Component<Props, State> {
  public render(): JSX.Element {
    const { title, subTitle, id } = this.props;
    return (
      <div className={classes.activityContainer}>
        <ActivitiesCheck id={id} selected={this.props.selected} OnCheckChange={this.props.OnCheckChange} />
        <div className={classes.activityContentContainer}>
          <span className={classes.title}>{title}</span>
          <span className={classes.subtitle}>{subTitle}</span>
        </div>
      </div>
    );
  }
} */
export default Activity;
