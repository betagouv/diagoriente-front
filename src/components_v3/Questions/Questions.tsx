import React, { Fragment } from 'react';
import MultiIcons from 'components_v3/icons/multiIcon/multiIcon';
import { map } from 'lodash';
import Button from 'components/buttons/RoundButton/RoundButton';
import classes from './question.module.scss';

type responseProps = {
  questionJobId: string;
  jobId: string;
  response: boolean;
  parcourId: string;
  _id?: string;
};
type QuestionType = {
  label: string;
  _id: string;
};

interface props {
  questions: any;
  jobId: string;
  responseQuestion: any;
  parcourId: string;
  onChangeQuestion: (answer: responseProps[]) => void;
  answersJobs: (data: any) => void;
  onCloseModal: () => void;
}
interface IProps extends props {}

const Questions = ({
  questions,
  jobId,
  responseQuestion,
  onChangeQuestion,
  answersJobs,
  parcourId,
  onCloseModal,
}: IProps) => {
  console.log(questions);
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
  const renderScore = () => {
    const arrayLength = responseQuestion.filter((item: any) => item.response === true).length;
    let result;
    if (arrayLength <= 3 && arrayLength > 0) {
      result = (
        <div className={classes.redWork}>
          {arrayLength}
          /10
          <span> Ce métier ne correspond peut-être pas à ce que tu imaginais </span>
        </div>
      );
    } else if (arrayLength >= 4 && arrayLength <= 7) {
      result = (
        <div className={classes.orangeWork}>
          {arrayLength}
          /10
          <span> Tu peux tester ce métier pour t’assurer qu’il te correspond bien </span>
        </div>
      );
    } else if (arrayLength >= 8 && arrayLength <= 10) {
      result = (
        <div className={classes.greenWork}>
          {arrayLength}
          /10
          <span>Ce métier semble te correspondre, fonce !</span>
        </div>
      );
    } else if (arrayLength === 0) {
      result = (
        <div className={classes.grayWork}>
          {arrayLength}
          /10
          <span> Répondez à la question s'il vous plait</span>
        </div>
      );
    }
    return result;
  };

  const onValidate = () => {
    answersJobs.call({ responses: responseQuestion }, 't');
    // onCloseModal();
  };
  return (
    <Fragment>
      <div className={classes.title_container}>
        <div className={classes.contentTitle}>
          <span className={classes.title}>CE MÉTIER EST-IL FAIT POUR MOI ?</span>
        </div>
        <div className={classes.contentTitleScore}>
          <span className={classes.title}>{renderScore()}</span>
        </div>
      </div>
      <div className={classes.container} id="element">
        <div className={classes.question_containers}>
          {map(questions, (item: QuestionType, i: number) => {
            const { index, selected } = getSelected(questions, () =>
              responseQuestion.find((r: any) => item._id === r.questionJobId));
            const onClick = (type: string, items: any) => {
              const nextFilters: responseProps[] = [...responseQuestion];
              if (selected) {
                nextFilters.splice(index - 1, 1);
                onChangeQuestion(nextFilters);
              } else if (type === 'remove') {
                nextFilters.push({
                  questionJobId: items._id,
                  response: false,
                  parcourId,
                  jobId,
                });
                onChangeQuestion(nextFilters);
              } else {
                nextFilters.push({
                  questionJobId: items._id,
                  response: true,
                  parcourId,
                  jobId,
                });
                onChangeQuestion(nextFilters);
              }
            };
            const initialStateValidate: string = responseQuestion[i] && responseQuestion[i].response ? '#ffba27' : '#666';
            const initialStateRemoeve: string = responseQuestion[i] && responseQuestion[i].response ? '#666' : '#e55d67';

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
        {questions && questions.length !== 0 && (
          <div className={classes.container_btn}>
            <Button onClick={onValidate} className={classes.btnValidate}>
              VALIDER
            </Button>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default Questions;
