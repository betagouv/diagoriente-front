import React, { useState } from 'react';
import MultiIcons from 'components_v3/icons/multiIcon/multiIcon';
import withApis, { ApiComponentProps } from 'hoc/withApi';
import { jobQuestion } from 'requests/jobs';
import { useDidMount } from 'hooks';
import { map } from 'lodash';

import classes from './question.module.scss';

interface AnswerQuestion {
  _idUser: string;
  _idJob: string;
  _idQuestion: string;
  response: boolean;
  description?: string;
}

interface IProps
  extends ApiComponentProps<{
    listQuestion: typeof jobQuestion;
  }> {}

const Questions = ({ listQuestion }: IProps) => {
  useDidMount(() => {
    listQuestion.call();
  });
  function getSelected<T>(
    array: T[],
    callback: (row: T, index: number, array: T[]) => boolean,
  ): { index: number; selected: boolean } {
    if (!array) {
      return { index: -1, selected: false };
    }
    const index = array.findIndex(callback);
    const selected = index !== -1;
    return { index, selected };
  }
  const [answers, setAnswers] = useState([] as any);
  return (
    <div className={classes.container}>
      <div className={classes.title_container}>
        <span className={classes.title}>CE MÉTIER EST-IL FAIT POUR MOI ?</span>
      </div>
      <div className={classes.question_containers}>
        {map(listQuestion.data.data, (item, i) => {
          const { index, selected } = getSelected(listQuestion.data.data, () =>
            answers.find((r: any) => item._id === r._id));
          const onClick = (type: string, items: any) => {
            const nextFilters: any[] = [...answers];
            if (selected) {
              nextFilters.splice(index - 1, 1);
              setAnswers(nextFilters);
            } else if (type === 'remove') {
              nextFilters.push({ _id: items._id, answer: 0 });
              setAnswers(nextFilters);
            } else {
              nextFilters.push({ _id: items._id, answer: 1 });
              setAnswers(nextFilters);
            }
          };
          const initialStateValidate = answers[i] && answers[i].answer ? '#ffba27' : '#666';
          const initialStateRemoeve = answers[i] && answers[i].answer ? '#666' : '#e55d67';

          return (
            <div key={item._id} className={classes.question}>
              <div className={classes.question_title}>{item.label}</div>
              <div className={classes.btn_container}>
                <MultiIcons
                  width="23"
                  height="23"
                  type="validate"
                  onClick={() => onClick('validate', item)}
                  className={classes.btn_validate}
                  Iconcolor={selected ? initialStateValidate : '#7a93bc'}
                />
                <MultiIcons
                  width="23"
                  height="23"
                  type="remove"
                  onClick={() => onClick('remove', item)}
                  className={classes.btn_remove}
                  Iconcolor={selected ? initialStateRemoeve : '#7a93bc'}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default withApis({ listQuestion: jobQuestion })(Questions);
