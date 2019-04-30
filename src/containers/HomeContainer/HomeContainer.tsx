import React from 'react';
import Circle from '../../components/ui/Circle/Circle';
import classes from './home.module.scss';
import Card from '../../components/ui/card/card';
import WithSub from '../../components/ui/Sub/Sub';
import HomeCard from '../../components/ui/homeCard/homeCard';
import Button from '../../components/buttons/RoundButton/RoundButton';
import classNames from '../../utils/classNames';
import { home } from '../../assets/homeasset';
import logo from '../../assets/icons/logo/diagoriente-logo-01.png';
import logo2x from '../../assets/icons/logo/diagoriente-logo-01@2x.png';
import logo3x from '../../assets/icons/logo/diagoriente-logo-01@3x.png';
import start_arrow from '../../../src/assets/icons/start-arrow.png';
const HomeContainer = ({ history }: any) => {
  const navigate = () => {
    history.push('/themes');
  };

  return (
    <div className={classes.home}>
      <div className={classes.contentContainer}>
        <div className={classes.headerContainer}>
          <div className={classes.logoWrapper}>
            <img
              src={logo}
              alt="Logo"
              className={classNames(classes.logo, 'item-12 item-xl-10 item-md-8 item-sm-6  item-xs-6')}
            />
          </div>
          {/*           {!isEmpty(user) && <button onClick={logout}>logout</button>}
           */}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '109px', alignItems: 'center' }}>
          <WithSub
            className={'item-8 item-sm-12'}
            style={{ margin: '0 auto', flexBasis: 'auto' }}
            title={'Trouve ta voie !'}
            subTitle={'Réleve tes competences et choisis ton futur métier'}
          />
          <Button className={classes.commencerBtn}>
            <span className={classes.btn_text}>Commencer</span>
            <img src={start_arrow} alt="start" />
          </Button>
        </div>
      </div>

      <div className={classNames('container', classes.cardContainer)}>
        <div className={classNames('absolute_fill', classes.cardContainerBackground)} />
        <div className={'item-4 item-sm-12 item-xs-12 item-smd-12'}>
          <HomeCard
            title=""
            subTitle="Réponds à quelques questions sur tes passions, et joue à des jeux"
            image="https://steemitimages.com/p/hgjbkodzNP3kumx8jDvG5UJWWNpEGQeXqQ3r48B8V6PwVj3oj4MLE4JUz5Fdxy8kEpZLox2JDyr5N2ki5XzdFgSFRv?format=match&mode=fit"
            buttonText="commencer"
            cardNumber={1}
          />
        </div>

        <div className={'item-4 item-sm-12 item-xs-12 item-smd-12'}>
          <HomeCard
            title=""
            subTitle="Réponds à quelques questions sur tes passions, et joue à des jeux"
            image="https://steemitimages.com/p/hgjbkodzNP3kumx8jDvG5UJWWNpEGQeXqQ3r48B8V6PwVj3oj4MLE4JUz5Fdxy8kEpZLox2JDyr5N2ki5XzdFgSFRv?format=match&mode=fit"
            buttonText="commencer"
            cardNumber={2}
          />
        </div>
        <div className={'item-4 item-sm-12 item-xs-12 item-smd-12'}>
          <HomeCard
            title=""
            subTitle="Réponds à quelques questions sur tes passions, et joue à des jeux"
            image="https://steemitimages.com/p/hgjbkodzNP3kumx8jDvG5UJWWNpEGQeXqQ3r48B8V6PwVj3oj4MLE4JUz5Fdxy8kEpZLox2JDyr5N2ki5XzdFgSFRv?format=match&mode=fit"
            buttonText="commencer"
            cardNumber={3}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
