import React, { useState } from 'react';
import Header from 'components_v3/Header/Header';
import home from 'assets_v3/Home/ACCUEIL.png';
import { getFaq, getOneFaq } from 'requests/faq';
import { useDidMount } from 'hooks';
import parse from 'html-react-parser';
import classes from './faq.module.scss';

interface test {
  data: { rebrique: string; questions: { question: string; response: any }[]; _id: string }[];
}

const FaqContainer = () => {
  const [list, setList] = useState<test | null>(null);
  const [faq, sertFaq] = useState<any>({});
  const [selected, setSelected] = useState('');
  const [rubrique, setRubrique] = useState('');
  const [questionId, setId] = useState('');

  const getOne = (id: string, bigTitle?: string) => {
    getOneFaq(id).then(response => sertFaq(response.data));
    setSelected(id);
    if (bigTitle) {
      setRubrique(bigTitle);
    }
  };
  useDidMount(() => {
    getFaq().then(response => {
      setList(response.data);
      getOne(response.data && response.data.data[0]._id, response.data.data[0].rebrique);
    });
  });

  const showSelected = (id: string) => {
    if (questionId.length === 0) {
      setId(id);
    } else {
      setId('');
    }
  };

  return (
    <div className={classes.container}>
      <Header showLogout />
      <div className={classes.TopBackground}>
        <span className={classes.title}>Foire aux questions</span>
        <img src={home} alt="home" className={classes.image} />
      </div>
      <div className={classes.body}>
        <div className={classes.rubriques}>
          {list
            && list.data.map((el: any) => (
              <span
                className={classes.rubriqueTitle}
                onClick={() => {
                  getOne(el._id, el.rebrique);
                }}
                key={el._id}
                style={selected === el._id ? { fontWeight: 'bolder', fontSize: 19, color: 'black' } : {}}
              >
                {el.rebrique}
              </span>
            ))}
        </div>
        <div className={classes.verticalLine} />
        <div className={classes.reponses}>
          <span className={classes.bigTitle}>{rubrique}</span>
          {faq
            && faq.questions
            && faq.questions.map((item: any) => (
              <div className={classes.questionAnswer} key={item._id}>
                <h3 className={classes.question} onClick={() => showSelected(item._id)}>
                  {item.question}
                </h3>
                {questionId === item._id && <span>{parse(item.response)}</span>}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default FaqContainer;
