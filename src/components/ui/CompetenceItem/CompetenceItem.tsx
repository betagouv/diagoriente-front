import React from 'react';
import { map, isEmpty } from 'lodash';
import classes from './competenceItem.module.scss';
import Progress from '../progressBars/ProgressBarCompetence/ProgressCompetence';
import ReactTooltip from 'react-tooltip';

interface IProps {
  parcours: {
    title: string;
    value: number;
    _id: string;
    niveau: { title: string; sub_title?: string };
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
            <span className={classes.bold_tooltip}>{item.niveau.title}</span>
             <span>{item.niveau.sub_title}</span>
            </ReactTooltip>
            <div className={classes.value}>
              <Progress
                width={item.value}
                title={!isEmpty(item.niveau) ? item.niveau.title : ''}
                sub_title={!isEmpty(item.niveau) ? item.niveau.sub_title : ''}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CompetenceItem;
