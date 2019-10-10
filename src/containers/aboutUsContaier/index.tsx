import React, { useState } from 'react';
import Header from 'components_v3/Header/Header';
import home from 'assets_v3/Home/ACCUEIL.png';
import parse from 'html-react-parser';
import { useDidMount } from 'hooks';
import { getAbout, IPage } from 'requests/about';
import classes from './aboutus.module.scss';

type ITest = {
  data: { title: string; type: string; page: { text: string; _id: string }[] }[];
};

const AboutContainer = () => {
  const [list, setList] = useState<any | null>(null);
  /* const [faq, sertFaq] = useState<any>({});
  const [selected, setSelected] = useState('');
  const [rubrique, setRubrique] = useState('');
  const [questionId, setId] = useState(''); */

  useDidMount(() => {
    getAbout().then(response => {
      setList(response.data);
    });
  });

  return (
    <div className={classes.container}>
      <Header showLogout />

      <div className={classes.TopBackground}>
        <span className={classes.title}>À PROPOS</span>
        <img src={home} alt="home" className={classes.image} />
      </div>
      <div className={classes.body}>
        <div className={classes.reponses}>
          {list
            && list.data.page.map((item: any) => {
              const result = <span>{parse(item.text)}</span>;
              return <div>{result}</div>;
            })}
        </div>
      </div>
    </div>
  );
};
export default AboutContainer;

