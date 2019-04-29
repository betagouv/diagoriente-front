import React from 'react';
import Circle from '../../components/ui/Circle/Circle';
import classes from './home.module.scss';
import Card from '../../components/ui/card/card';
import WithSub from '../../components/ui/Withsub/WithSub';
import HomeCard from '../../components/ui/homeCard/homeCard';
import Button from '../../components/ui/button/button';
import classNames from '../../utils/classNames';
import { home } from '../../assets/homeasset';

const HomeContainer = ({ history }: any) => {
  const navigate = () => {
    history.push('/themes');
  };

  return (
    <div className={classes.home}>
      <div className={classes.contentContainer}>
        <img src={home} alt="" className={classes.homeAsset} />
        <WithSub
          className={'item-8 item-sm-12'}
          style={{ margin: 'auto' }}
          title={'Trouve ta voie !'}
          subTitle={'Réleve tes competences et choisis ton futur métier'}
        />
        <Button className={classes.commencerBtn}>Commencer</Button>
      </div>

      <div className={classNames('container', classes.cardContainer)}>
        <div className={'item-4 item-sm-12'}>
          <HomeCard
            title=""
            subTitle="Réponds à quelques questions sur tes passions, et joue à des jeux"
            image="https://steemitimages.com/p/hgjbkodzNP3kumx8jDvG5UJWWNpEGQeXqQ3r48B8V6PwVj3oj4MLE4JUz5Fdxy8kEpZLox2JDyr5N2ki5XzdFgSFRv?format=match&mode=fit"
            buttonText="commencer"
            cardNumber={1}
          />
        </div>

        <div className={'item-4 item-sm-12'}>
          <HomeCard
            title=""
            subTitle="Réponds à quelques questions sur tes passions, et joue à des jeux"
            image="https://steemitimages.com/p/hgjbkodzNP3kumx8jDvG5UJWWNpEGQeXqQ3r48B8V6PwVj3oj4MLE4JUz5Fdxy8kEpZLox2JDyr5N2ki5XzdFgSFRv?format=match&mode=fit"
            buttonText="commencer"
            cardNumber={1}
          />
        </div>
        <div className={'item-4 item-sm-12'}>
          <HomeCard
            title=""
            subTitle="Réponds à quelques questions sur tes passions, et joue à des jeux"
            image="https://steemitimages.com/p/hgjbkodzNP3kumx8jDvG5UJWWNpEGQeXqQ3r48B8V6PwVj3oj4MLE4JUz5Fdxy8kEpZLox2JDyr5N2ki5XzdFgSFRv?format=match&mode=fit"
            buttonText="commencer"
            cardNumber={1}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
