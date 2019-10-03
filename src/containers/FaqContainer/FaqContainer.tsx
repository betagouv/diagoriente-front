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

  const getOne = (id: string) => {
    getOneFaq(id).then(response => sertFaq(response.data));
  };
  useDidMount(() => {
    getFaq().then(response => {
      setList(response.data);
      getOne(response.data && response.data.data[0]._id);
    });
  });

  console.log('this is faq', list);
  return (
    <div className={classes.container}>
      <Header showLogout />
      <div className={classes.TopBackground}>
        <span className={classes.title}>Foire aux Questions</span>
        <img src={home} alt="home" className={classes.image} />
      </div>
      <div className={classes.body}>
        <div className={classes.rubriques}>
          {list
            && list.data.map((el: any) => (
              <span className={classes.rubriqueTitle} onClick={() => getOne(el._id)} key={el._id}>
                {el.rebrique}
              </span>
            ))}
        </div>
        <div className={classes.verticalLine} />
        <div className={classes.reponses}>
          {faq
            && faq.questions
            && faq.questions.map((item: any) => (
              <div className={classes.questionAnswer} key={item._id}>
                <span className={classes.question}>{item.question}</span>
                <span>{parse(item.response)}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default FaqContainer;
