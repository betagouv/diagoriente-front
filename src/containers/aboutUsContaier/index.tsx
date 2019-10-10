import React, { useState } from 'react';
import Header from 'components_v3/Header/Header';
import home from 'assets_v3/Home/ACCUEIL.png';
import parse from 'html-react-parser';
import { useDidMount } from 'hooks';
import { getAbout } from 'requests/about';
import classes from './aboutus.module.scss';

interface test {
  data: { apropos: { text: string; _id: string }[]; _id: string }[];
}

const AboutContainer = () => {
  const [list, setList] = useState<test | null>(null);
  /* const [faq, sertFaq] = useState<any>({});
  const [selected, setSelected] = useState('');
  const [rubrique, setRubrique] = useState('');
  const [questionId, setId] = useState(''); */

  useDidMount(() => {
    getAbout().then(response => {
      setList(response.data);
      console.log(response.data);
    });
  });

  return (
    <div className={classes.container}>
      <Header showLogout />

      <div className={classes.TopBackground}>
        <span className={classes.title}>À PROPOS</span>
        <img src={home} alt="home" className={classes.image} />
      </div>
      <div className={classes.body}>
        <div className={classes.reponses}>
          {list
            && list.data.map((item: any) => {
           const result = item.apropos.map((el: any) => <span>{parse(el.text)}</span>);
              return (
                <div>{result}</div>
              )
            })}
        </div>
      </div>
    </div>
  );
};
export default AboutContainer;
