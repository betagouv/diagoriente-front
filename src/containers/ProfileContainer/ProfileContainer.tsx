import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

// types
import { ReduxState, ApiReducer, ICurrentParcours } from 'reducers';

// components
import Grid from '../../components/ui/Grid/Grid';
import Info from '../../components/ui/Info/Info';
import StepCard from '../../components/cards/StepCard/StepCard';
import QuestionMarks from '../../components/shapes/questionMark/questionMark';
import Circles from '../../components/shapes/circles/circles';
import Triangles from '../../components/shapes/triangles/triangles';
import CardProgress from '../../components/cards/CardProgress/CardProgress';
import RoundButton from '../../components/buttons/RoundButton/RoundButton';

// hooks
import { useDidMount } from '../../hooks';

// api
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import { getParcours } from '../../requests';

// css
import classes from './profileContainer.module.scss';

interface MapToProps {
  currentParcours: ApiReducer<ICurrentParcours>;
}

type Props = RouteComponentProps & ApiComponentProps<{ getParcours: typeof getParcours }> & MapToProps;

const ProfileContainer = ({ history, getParcours, currentParcours }: Props) => {
  const navigate = (path: string) => () => {
    history.push(path);
  };

  useDidMount(() => {
    if (currentParcours.data._id) {
      getParcours.call(currentParcours.data._id);
    }
  });

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
      footerComponent: true ? (
        <RoundButton onClick={navigate('/themes')} className={`${classes.round_button} ${classes.step2_round_button}`}>
          Commencer
        </RoundButton>
      ) : (
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
      footerComponent: true ? (
        <RoundButton disabled={true} className={`${classes.round_button} ${classes.step3_round_button}`}>
          Bientôt
        </RoundButton>
      ) : (
        <button onClick={navigate('/themes')} className={classes.step_card_footer_text}>
          Mettre à jour
        </button>
      ),
      disabled: true,
    },
    {
      headerComponent: <div className={classes.info_step_header} />,
      disabled: true,
      circleComponent: <span className={`${classes.step} ${classes.step_4}`}>{4}</span>,
      title: 'Compléter mes informations',
      description: 'On a encore quelques questions à te poser',
      footerComponent: true ? (
        <RoundButton disabled={true} className={`${classes.round_button} ${classes.step4_round_button}`}>
          Bientôt
        </RoundButton>
      ) : (
        <button onClick={navigate('/themes')} className={classes.step_card_footer_text}>
          Mettre à jour
        </button>
      ),
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

const mapStateToProps = ({ currentParcours }: ReduxState) => ({
  currentParcours,
});

export default connect(mapStateToProps)(withApis({ getParcours })(ProfileContainer));
