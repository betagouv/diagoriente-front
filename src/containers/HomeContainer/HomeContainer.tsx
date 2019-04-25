import React from 'react';
import Button from '../../components/ui/button/button';
import Circle from '../../components/ui/Circle/Circle';
/* import classNames from '../../../utils/classNames';
*/ import classes from './home.module.scss';
import Card from '../../components/ui/card/card';
import WithSub from '../../components/ui/withsub/withSub';
import HomeCard from '../../components/ui/homeCard/homeCard';

const HomeContainer = () => {
  return (
    <div className={classes.home}>
      <WithSub  className={classes.WithSub} title={'Trouve ta voie !'} subTitle={'Réleve tes competences et choisis ton futur métier'}  />
      <Button className={classes.commencerBtn}>Commencer</Button>
      <div className={classes.CardContainer}>
        <HomeCard
          title=""
          subTitle="Réponds à quelques questions sur tes passions, et joue à des jeux"
          image="https://steemitimages.com/p/hgjbkodzNP3kumx8jDvG5UJWWNpEGQeXqQ3r48B8V6PwVj3oj4MLE4JUz5Fdxy8kEpZLox2JDyr5N2ki5XzdFgSFRv?format=match&mode=fit"
          buttonText="commencer"
          cardNumber={1}
        />
        <HomeCard
          title=""
          subTitle="Réponds à quelques questions sur tes passions, et joue à des jeux"
          image="https://steemitimages.com/p/hgjbkodzNP3kumx8jDvG5UJWWNpEGQeXqQ3r48B8V6PwVj3oj4MLE4JUz5Fdxy8kEpZLox2JDyr5N2ki5XzdFgSFRv?format=match&mode=fit"
          buttonText="commencer"
          cardNumber={1}
        />
        <HomeCard
          title=""
          subTitle="Réponds à quelques questions sur tes passions, et joue à des jeux"
          image="https://steemitimages.com/p/hgjbkodzNP3kumx8jDvG5UJWWNpEGQeXqQ3r48B8V6PwVj3oj4MLE4JUz5Fdxy8kEpZLox2JDyr5N2ki5XzdFgSFRv?format=match&mode=fit"
          buttonText="commencer"
          cardNumber={1}
        />
      </div>
    </div>
  );
};

export default HomeContainer;
