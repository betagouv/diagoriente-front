import React, { Fragment, useEffect } from 'react';
import MultiIcons from 'components_v3/icons/multiIcon/multiIcon';
import { map } from 'lodash';
import Button from 'components/buttons/RoundButton/RoundButton';
import classes from './question.module.scss';

type responseProps = {
  questionJobId: string;
  response: boolean;
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
  update: boolean;
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

  // console.log(responseQuestion)
  useEffect(() => {
    if (questions) {
      let updatedArray = [];
      const newArray: any[] = [];
      updatedArray = questions.filter((item: any) => item.response === true || item.response === false);
      updatedArray.map((item: any) =>
        newArray.push({ questionJobId: item._id, response: item.response }));
      onChangeQuestion(newArray);
    }
  }, [questions]);
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
    answersJobs.call({ parcourId, jobId, responses: responseQuestion }, 't');
    onCloseModal();
  };
  const [DisplayedChild, changeDisplayedChild] = useState(0);
  const [test, setTest] = useState<any>([]);

  const items = map(questions, (item: QuestionType, i) => {
    const { index, selected } = getSelected(
      responseQuestion,
      (r: any) => item._id === (r.questionJobId || r._id),
    );
    
    const nextFilters: responseProps[] = [...responseQuestion];
    const onClick = (response: boolean) => {
        const answers = [...test];
        answers.push(response);
        setTest(answers)
       // console.log(answers);

      if (selected) {
        const question = nextFilters[index];
        if (question.response === response) {
          nextFilters.splice(index, 1);
        } else {
          nextFilters[index] = { ...question, response };
        }
      } else {
        nextFilters.push({
          questionJobId: item._id,
          response,
        });
      }

      onChangeQuestion(nextFilters);
    };
    const initialStateValidate: string = selected && responseQuestion[index].response ? '#ffba27' : '#666';
    const initialStateRemoeve: string = selected && responseQuestion[index].response ? '#666' : '#e55d67';

    return (
      <div key={item._id} className={classes.question}>
        <span>{i + 1}/{questions.length}</span>
        <div className={classes.question_title}>{item.label}</div>

        <div className={classes.btn_container}>
          {/* <MultiIcons
            width="23"
            height="23"
            type="validate"
            onClick={() => onClick(true)}
            className={classes.btn_validate}
            Iconcolor={selected ? initialStateValidate : '#7a93bc'}
          /> */}
          <Button
            title="Oui"
            color="blue"
            onClick={() => {
               onClick(true);
              changeDisplayedChild(DisplayedChild + 1);
              onValidate();
              }}
            className={classes.yesNoButton}
          />
          <Button
            title="Non"
            color="red"
            onClick={() => {
              onClick(false)
              changeDisplayedChild(DisplayedChild + 1);
              onValidate();
            }}
            className={classes.yesNoButton}
          />
          {/* <MultiIcons
            width="23"
            height="23"
            type="remove"
            onClick={() => onClick(false)}
            className={classes.btn_remove}
            Iconcolor={selected ? initialStateRemoeve : '#7a93bc'}
          /> */}
        </div>
      </div>
    );
  })
  return (
    <Fragment>
      <div className={classes.title_container}>
        <div className={classes.contentTitle}>
          <span className={classes.title}>SUIS-JE PRÊT ?</span>
        </div>
        {/* <div className={classes.contentTitleScore}>
          <span className={classes.title}>{renderScore()}</span>
        </div> */}
      </div>
      <div className={classes.container} id="element">
        <div className={classes.question_containers}>
          {map(questions, (item: QuestionType) => {
            const { index, selected } = getSelected(
              responseQuestion,
              (r: any) => item._id === (r.questionJobId || r._id),
            );
            const nextFilters: responseProps[] = [...responseQuestion];
            const onClick = (response: boolean) => {
              if (selected) {
                const question = nextFilters[index];
                if (question.response === response) {
                  nextFilters.splice(index, 1);
                } else {
                  nextFilters[index] = { ...question, response };
                }
              } else {
                nextFilters.push({
                  questionJobId: item._id,
                  response,
                });
              }

              onChangeQuestion(nextFilters);
            };
            const initialStateValidate: string = selected && responseQuestion[index].response ? '#ffba27' : '#666';
            const initialStateRemoeve: string = selected && responseQuestion[index].response ? '#666' : '#e55d67';

            return (
              <div key={item._id} className={classes.question}>
                <div className={classes.question_title}>{item.label}</div>

                <div className={classes.btn_container}>
                  <MultiIcons
                    width="23"
                    height="23"
                    type="validate"
                    onClick={() => onClick(true)}
                    className={classes.btn_validate}
                    Iconcolor={selected ? initialStateValidate : '#7a93bc'}
                  />
                  <MultiIcons
                    width="23"
                    height="23"
                    type="remove"
                    onClick={() => onClick(false)}
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
              Valider
            </Button>
          </div>
        ) */}
        <div className={classes.dotsContainer}>
          <VerticalStepper
            handleClick={changeDisplayedChild}
            DisplayedFamily={DisplayedChild}
            listItems={items}
            forQuestions
            responses={test}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default Questions;
