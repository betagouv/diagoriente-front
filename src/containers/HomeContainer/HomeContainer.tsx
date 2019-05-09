import React from 'react';

import classes from './home.module.scss';

import WithSub from '../../components/ui/Sub/Sub';
import Button from '../../components/buttons/RoundButton/RoundButton';
import classNames from '../../utils/classNames';
import logo from '../../assets/icons/logo/diagoriente-logo-01.png';

import start_arrow from '../../../src/assets/icons/start-arrow.png';
import O from '../../assets/icons/svg/O.svg';

import Grid from '../../components/ui/Grid/Grid';
import QuestionMarks from '../../components/shapes/questionMark/questionMark';
import Circles from '../../components/shapes/circles/circles';
import Triangles from '../../components/shapes/triangles/triangles';
import StepCard from '../../components/cards/StepCard/StepCard';

const steps = [
  {
    headerComponent: <QuestionMarks />,
    circleComponent: <span className={`${classes.step} ${classes.step_1}`}>{1}</span>,
    description: 'Dècouvre comment identifier tes compÈtences en jouant',
  },
  {
    headerComponent: <Circles />,
    circleComponent: <span className={`${classes.step} ${classes.step_2}`}>{2}</span>,
    description: 'Complète ton profil et découvre ta carte de compétences',
  },
  {
    headerComponent: <Triangles />,
    circleComponent: <span className={`${classes.step} ${classes.step_3}`}>{3}</span>,
    description: "Diagoriente te propose des pistes pour ton orientation et ta mission d'intèrêt gènèral",
  },
];

const HomeContainer = ({ history }: any) => {
  const navigate = () => {
    history.push('/profile');
  };

  return (
    <div className={classes.home}>
      <div className={classes.contentContainer}>
        <div className={classes.headerContainer}>
          <div className={classes.logoWrapper}>
            <img src={logo} alt="Logo" className={classes.logo} />
          </div>
        </div>
        <div className={classes.content}>
          <WithSub
            className={classes.WithSub}
            title1={'Trouve ta v'}
            titleIcon={O}
            title2={'ie !'}
            subTitle={'Révèle tes compétences et engage toi dans ton orientation'}
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
        {steps.map((step, i) => (
          <Grid key={i} className={classes.step_card} item xl={4} smd={12}>
            <StepCard {...step} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomeContainer;
