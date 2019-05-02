import React from 'react';

import classes from './home.module.scss';

import WithSub from '../../components/ui/Sub/Sub';
import HomeCard from '../../components/ui/homeCard/homeCard';
import Button from '../../components/buttons/RoundButton/RoundButton';
import classNames from '../../utils/classNames';
import logo from '../../assets/icons/logo/diagoriente-logo-01.png';

import start_arrow from '../../../src/assets/icons/start-arrow.png';
import Stars from  '../../components/stars/stars';

import Grid from '../../components/ui/Grid/Grid';

const HomeContainer = ({ history }: any) => {
  const navigate = () => {
    history.push('/profile');
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
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '109px', alignItems: 'center' }}>
          <WithSub
            className={'item-8 item-sm-12'}
            style={{ margin: '0 auto', flexBasis: 'auto' }}
            title={'Trouve ta voie !'}
            subTitle={'Réleve tes competences et choisis ton futur métier'}
          />
          <Button onClick={navigate} className={classes.commencerBtn}>
            <span className={classes.btn_text}>Commencer</span>
            <img src={start_arrow} alt="start" />
          </Button>
        </div>
      </div>

      <Grid container className={classes.cardContainer}>
        <div className={classNames('absolute_fill', classes.cardContainerBackground)} />
        <div className={classes.left_triangle_container} />
        <div className={classes.right_triangle_container} />
        <Grid item xl={4} smd={12}>
          <HomeCard
            title=""
            subTitle="Réponds à quelques questions sur tes passions, et joue à des jeux"
            image="https://steemitimages.com/p/hgjbkodzNP3kumx8jDvG5UJWWNpEGQeXqQ3r48B8V6PwVj3oj4MLE4JUz5Fdxy8kEpZLox2JDyr5N2ki5XzdFgSFRv?format=match&mode=fit"
            buttonText="commencer"
            cardNumber={1}
          />
        </Grid>

        <Grid item xl={4} smd={12}>
          <HomeCard
            title=""
            subTitle="Réponds à quelques questions sur tes passions, et joue à des jeux"
            image="https://steemitimages.com/p/hgjbkodzNP3kumx8jDvG5UJWWNpEGQeXqQ3r48B8V6PwVj3oj4MLE4JUz5Fdxy8kEpZLox2JDyr5N2ki5XzdFgSFRv?format=match&mode=fit"
            buttonText="commencer"
            cardNumber={2}
          />
        </Grid>
        <Grid item xl={4} smd={12}>
          <HomeCard
            title=""
            subTitle="Réponds à quelques questions sur tes passions, et joue à des jeux"
            image="https://steemitimages.com/p/hgjbkodzNP3kumx8jDvG5UJWWNpEGQeXqQ3r48B8V6PwVj3oj4MLE4JUz5Fdxy8kEpZLox2JDyr5N2ki5XzdFgSFRv?format=match&mode=fit"
            buttonText="commencer"
            cardNumber={3}
          />
        </Grid>
      </Grid>
      <Stars/>
    </div>
  );
};

export default HomeContainer;
