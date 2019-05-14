import React from 'react';
import { map } from 'lodash';
import classes from './competenceItem.module.scss';
import Progress from '../progressBars/ProgressBarCompetence/ProgressCompetence';
import ReactTooltip from 'react-tooltip';

interface IProps {
  parcours: {
    title: string;
    value: number;
    _id: string;
  }[];
}
const CompetenceItem = ({ parcours }: IProps) => {
  return (
    <div className={classes.container}>
      {map(parcours, item => {
        return (
          <div key={item._id} className={classes.item}>
            <div className={classes.label} data-for={item._id} data-tip>
              {item.title}
            </div>
            <ReactTooltip id={item._id} place="top" type="light" className={classes.tooltip}>
              {item.title}
            </ReactTooltip>
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
