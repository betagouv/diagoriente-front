import React from 'react';
import { map } from 'lodash';
import classes from './competenceItem.module.scss';
import Progress from '../progressBars/ProgressBarCompetence/ProgressCompetence';
interface IProps {
  parcours: {
    title: string;
    value: number;
    _id: string
  }[];
}
const CompetenceItem = ({ parcours }: IProps) => {
  return (
    <div className={classes.container}>
      {map(parcours, item => {
        return (
          <div key={item._id} className={classes.item}>
            <div className={classes.label}>{item.title}</div>
            <div className={classes.value}>
              <Progress width={item.value} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CompetenceItem;
