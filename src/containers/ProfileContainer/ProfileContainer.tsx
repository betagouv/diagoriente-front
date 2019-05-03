import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Grid from '../../components/ui/Grid/Grid';
import Info from '../../components/ui/Info/Info';
import StepCard from '../../components/cards/StepCard/StepCard';
import QuestionMarks from '../../components/shapes/questionMark/questionMark';
import Circles from '../../components/shapes/circles/circles';
import Triangles from '../../components/shapes/triangles/triangles';
import CardProgress from '../../components/cards/CardProgress/CardProgress';
import classes from './profileContainer.module.scss';

const ProfileContainer = ({ history }: RouteComponentProps) => {
  const navigate = (path: string) => () => {
    history.push(path);
  };

  const steps = [
    {
      headerComponent: <QuestionMarks />,
      circleComponent: <span className={`${classes.step} ${classes.step_1}`}>{1}</span>,
      title: 'Introduction',
      description: 'Découvre un jeu d’introduction sur les compétences en entreprise',
      footerComponent: <button className={classes.step_card_footer_text}>Rejouer</button>,
    },
    {
      headerComponent: <Circles />,
      circleComponent: <span className={`${classes.step} ${classes.step_2}`}>{2}</span>,
      title: 'Mes passions et mes hobbies',
      description: 'Tu as des compétences sans le savoir, aide-nous à les identifier !',
      footerComponent: (
        <button onClick={navigate('/themes')} className={classes.step_card_footer_text}>
          Mettre à jour
        </button>
      ),
    },
    {
      headerComponent: <Triangles />,
      circleComponent: <span className={`${classes.step} ${classes.step_3}`}>{3}</span>,
      title: 'Compléter mes petits boulots',
      description: 'Ton expérience intéresse tes futurs employeurs !',
    },
    {
      headerComponent: <div className={classes.info_step_header} />,
      disabled: true,
      circleComponent: <span className={`${classes.step} ${classes.step_4}`}>{4}</span>,
      title: 'Compléter mes informations',
      description: 'On a encore quelques questions à te poser',
    },
  ];

  return (
    <div className={classes.container}>
      <Grid container className={'flex_center'}>
        <Grid item xl={12} className={classes.title}>
          Bienvenue sur Diagoriente
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xl={12}>
          <Info>Complète les différentes rubriques pour enrichir ton profil de compétences</Info>
        </Grid>
      </Grid>
      <Grid className={classes.steps_container} container>
        <Grid item xl={8} md={12}>
          <Grid className={classes.cards_container} padding={{ xl: 0 }} container>
            {steps.map((step, i) => (
              <Grid className={classes.card} key={i} item xl={6} smd={12}>
                <StepCard
                  classes={{
                    content: classes.step_card_content,
                    title: `${classes.card_title} ${classes[`step${i + 1}_card_title`]}`,
                    description: classes.card_description,
                  }}
                  {...step}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xl={4}>
          <CardProgress progress={4} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileContainer;
