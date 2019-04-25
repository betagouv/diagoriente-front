import React from 'react';
import Button from '../../components/buttons/RoundButton/RoundButton';
import Circle from '../../components/ui/Circle/Circle';
/* import classNames from '../../../utils/classNames';
*/ import classes from './home.module.scss';
import Card from '../../components/ui/card/card';
import WithSub from '../../components/ui/withsub/withSub';
import HomeCard from '../../components/ui/homeCard/homeCard';

const HomeContainer = ({ history }: any) => {
  const navigate = () => {
    history.push('/themes');
  };

  const items1 = [];
  for (let i = 0; i < 12; i += 1) {
    items1.push(<div className={'item-1'} style={{ background: 'blue', height: 50 }} />);
  }

  const items2 = [];
  for (let i = 0; i < 6; i += 1) {
    items2.push(<div className={'item-2'} style={{ background: 'blue', height: 50 }} />);
  }

  const items3 = [];
  for (let i = 0; i < 4; i += 1) {
    items3.push(<div className={'item-3'} style={{ background: 'blue', height: 50 }} />);
  }

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
      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-4'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-8'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-5'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-7'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-6'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-6'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-7'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-5'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-8'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-4'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-9'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-3'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-10'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-2'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-11'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-1'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-12'} style={{ background: 'blue', height: 50 }} />
      </div>

      <Card>Famille</Card> 
    </div>
  );
};

export default HomeContainer;
