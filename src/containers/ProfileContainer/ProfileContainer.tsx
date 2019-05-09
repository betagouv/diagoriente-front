import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

// types
import { ReduxState, ApiReducer, IParcoursResponse } from 'reducers';

// components
import Grid from '../../components/ui/Grid/Grid';
import Info from '../../components/ui/Info/Info';
import StepCard from '../../components/cards/StepCard/StepCard';
import QuestionMarks from '../../components/shapes/questionMark/questionMark';
import Circles from '../../components/shapes/circles/circles';
import Triangles from '../../components/shapes/triangles/triangles';
import CardProgress from '../../components/cards/CardProgress/CardProgress';
import RoundButton from '../../components/buttons/RoundButton/RoundButton';
import CardCompetence from '../../components/cards/CardCompetence/Competence';
import Header from '../../layout/Header/Header';

// hooks
import { useDidMount } from '../../hooks';

// api
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import { getParcours } from '../../requests';

// css
import classes from './profileContainer.module.scss';

interface MapToProps {
  parcours: ApiReducer<IParcoursResponse>;
}

type Props = RouteComponentProps & ApiComponentProps<{ getParcours: typeof getParcours }> & MapToProps;

const ProfileContainer = ({ history, getParcours, parcours }: Props) => {
  const navigate = (path: string) => () => {
    history.push(path);
  };

  useDidMount(() => {
    if (parcours.data._id) {
      getParcours.call(parcours.data._id);
    }
  });

  const persoSkills = parcours.data.skills.filter(skill => skill.theme.type === 'personal');
  const proSkills = parcours.data.skills.filter(skill => skill.theme.type === 'professional');

  const isPersoCompleted =
    persoSkills.length > 0 && !persoSkills.find(skill => !(skill.activities.length && skill.competences.length));
  const isProCompleted =
    proSkills.length > 0 && !proSkills.find(skill => !(skill.activities.length && skill.competences.length));

  const steps = [
    {
      headerComponent: <QuestionMarks />,
      circleComponent: <span className={`${classes.step} ${classes.step_1}`}>{1}</span>,
      title: 'Introduction',
      description: 'Découvre un jeu d’introduction sur les compétences en entreprise',
      footerComponent: (
        <div className={classes.step_footer}>
          <button className={classes.step_card_footer_text}>Rejouer</button>
        </div>
      ),
    },
    {
      headerComponent: <Circles />,
      circleComponent: <span className={`${classes.step} ${classes.step_2}`}>{2}</span>,
      title: 'Mes passions et mes hobbies',
      description: 'Tu as des compétences sans le savoir, aide-nous à les identifier !',
      footerComponent: !isPersoCompleted ? (
        <div className={classes.step_footer}>
          <RoundButton
            onClick={navigate('/themes')}
            className={`${classes.round_button} ${classes.step2_round_button}`}
          >
            Commencer
          </RoundButton>
        </div>
      ) : (
        <div className={classes.step_footer}>
          <button onClick={navigate('/themes')} className={classes.step_card_footer_text}>
            Mettre à jour
          </button>
        </div>
      ),
    },
    {
      headerComponent: <Triangles />,
      circleComponent: <span className={`${classes.step} ${classes.step_3}`}>{3}</span>,
      title: 'Compléter mes petits boulots',
      description: 'Ton expérience intéresse tes futurs employeurs !',
      footerComponent: !isProCompleted ? (
        <div className={classes.step_footer}>
          <RoundButton
            onClick={navigate('/themes?type=professional')}
            className={`${classes.round_button} ${classes.step3_round_button}`}
          >
            {isPersoCompleted ? 'Commencer' : 'Bientôt'}
          </RoundButton>
        </div>
      ) : (
        <div className={classes.step_footer}>
          <button onClick={navigate('/themes?type=professional')} className={classes.step_card_footer_text}>
            Mettre à jour
          </button>
        </div>
      ),
      disabled: !isPersoCompleted,
    },
    {
      headerComponent: <div className={classes.info_step_header} />,
      disabled: !(isPersoCompleted && isProCompleted),
      circleComponent: <span className={`${classes.step} ${classes.step_4}`}>{4}</span>,
      title: 'Compléter mes informations',
      description: 'On a encore quelques questions à te poser',
      footerComponent: true ? (
        <div className={classes.step_footer}>
          <RoundButton className={`${classes.round_button} ${classes.step4_round_button}`}>
            {isPersoCompleted ? 'Bientôt' : 'Commencer'}
          </RoundButton>
        </div>
      ) : (
        <div className={classes.step_footer}>
          <button onClick={navigate('/themes')} className={classes.step_card_footer_text}>
            Mettre à jour
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={classes.container}>
      <Header />
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
        <Grid item xl={8} lg={6} md={12}>
          <Grid className={classes.cards_container} padding={{ xl: 0 }} container>
            {steps.map((step, i) => (
              <Grid className={classes.card} key={i} item xl={6} lg={12}>
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
        <Grid item xl={4} lg={6} md={12}>
          <CardProgress progress={4} />
          <CardCompetence parcours={getParcours.data.globalCopmetences} />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ parcours }: ReduxState) => ({
  parcours,
});

export default connect(mapStateToProps)(withApis({ getParcours })(ProfileContainer));
