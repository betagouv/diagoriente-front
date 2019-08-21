import React, { useState } from 'react';
import { map } from 'lodash';
import MultiIcons from 'components_v3/icons/multiIcon/multiIcon';
import classes from '*.module.scss';

function getSelected<T>(
  array: T[],
  callback: (row: T, index: number, array: T[]) => boolean,
): { index: number; selected: boolean } {
  const index = array.findIndex(callback);
  const selected = index !== -1;
  return { index, selected };
}

const questions = [
  {
    _id: 0,
    title:
      'Ceci est une question relativement longue permettant de savoir si ce métier est fait pour moi ?',
  },
  {
    _id: 1,
    title:
      'Ceci est une question relativement longue permettant de savoir si ce métier est fait pour moi ?',
  },
  {
    _id: 2,
    title:
      'Ceci est une question relativement longue permettant de savoir si ce métier est fait pour moi ?',
  },
  {
    _id: 3,
    title:
      'Ceci est une question relativement longue permettant de savoir si ce métier est fait pour moi ?',
  },
  {
    _id: 4,
    title:
      'Ceci est une question relativement longue permettant de savoir si ce métier est fait pour moi ?',
  },
];

const Questions = () => {
  const [answers, setAnswers] = useState([]);
  return (
    <div className={classes.container}>
      <div className={classes.title_container}>
        <span className={classes.title}>CE MÉTIER EST-IL FAIT POUR MOI ?</span>
      </div>
      <div className={classes.question_containers}>
        {map(questions, item => (
          <div className={classes.question}>
            <div className={classes.question_title}>{item.title}</div>
            <div className={classes.btn_container}>
              <MultiIcons width="23" height="23" type="validate" />
              <MultiIcons width="23" height="23" type="remove" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Questions;
