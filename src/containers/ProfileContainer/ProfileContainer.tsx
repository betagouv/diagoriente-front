import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

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
import CompleteProfile from '../../components/ui/CompleteProfile/CompleteProfile';
// hooks
import { useDidMount } from '../../hooks';

// api
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import { getParcours, getFavorites } from '../../requests';

// actions
import ParcoursActions from '../../reducers/parcours';

// css
import classes from './profileContainer.module.scss';
import JobCard from '../../components/cards/JobCard/JobCard';

interface ParcourParmas {
  completed?: boolean;
  createdAt?: string;
  families?: [];
  skills?: any[];
  updatedAt?: string;
  userId?: string;
  _id?: string;
  played: boolean;
}

interface MapToProps {
  parcours: ApiReducer<IParcoursResponse>;
  parcoursRequest: (payload: ParcourParmas) => void;
}

type Props = RouteComponentProps &
  ApiComponentProps<{ getParcours: typeof getParcours; getFavorites: typeof getFavorites }> &
  MapToProps;

const ProfileContainer = ({ history, getParcours, parcours, parcoursRequest, getFavorites }: Props) => {
  const navigate = (path: string) => () => {
    history.push(path);
  };

  useDidMount(() => {
    if (parcours.data._id) {
      getParcours.call(parcours.data._id);
    }
    getFavorites.call();
  });
  console.log(getFavorites.data);
  const gameHandler = () => {
    parcoursRequest({ played: true });
    navigate('/game')();
  };

  const persoSkills = parcours.data.skills.filter(skill => skill.theme.type === 'personal');
  const proSkills = parcours.data.skills.filter(skill => skill.theme.type === 'professional');

  const isPersoCompleted =
    persoSkills.length > 0 && !persoSkills.find(skill => !(skill.activities.length && skill.competences.length));
  const isProCompleted =
    proSkills.length > 0 && !proSkills.find(skill => !(skill.activities.length && skill.competences.length));

  let niveau = 0;
  if (parcours.data.played) niveau = 1;
  if (niveau >= 1 && isPersoCompleted) niveau = 2;
  if (niveau >= 2 && parcours.data.families.length) niveau = 3;
  if (niveau >= 3 && isProCompleted) niveau = 4;

  const onCompleteProfile = () => {
    let action = navigate('/jobs');
    switch (niveau) {
      case 0:
        action = gameHandler;
      case 1:
        action = navigate('/themes');
      case 2:
        action = navigate('/favoris');
      case 3:
        action = navigate('/themes?type=professional');
    }
    action();
  };

  const steps = [
    {
      headerComponent: <QuestionMarks />,
      circleComponent: <span className={`${classes.step} ${classes.step_1}`}>{1}</span>,
      title: 'Mini jeu',
      description: 'Apprends une méthode simple pour identifier des compétences',
      footerComponent:
        niveau < 1 ? (
          <div className={classes.step_footer}>
            <RoundButton onClick={gameHandler} className={`${classes.round_button} ${classes.step1_round_button}`}>
              Jouer
            </RoundButton>
          </div>
        ) : (
          <div className={classes.step_footer}>
            <button className={classes.step_card_footer_text} onClick={navigate('/game')}>
              Rejouer
            </button>
          </div>
        ),
    },
    {
      disabled: niveau === 0,
      headerComponent: <Circles />,
      circleComponent: <span className={`${classes.step} ${classes.step_2}`}>{2}</span>,
      title: 'Ma carte de compétences',
      description: 'Liste toutes tes expériences et rèvèle tes compétences',
      footerComponent:
        niveau <= 1 ? (
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
      headerComponent: <div className={classes.info_step_header} />,
      disabled: niveau <= 1,
      circleComponent: <span className={`${classes.step} ${classes.step_4}`}>{3}</span>,
      title: 'Mes thèmes favoris',
      description: "Précise tes pistes d'orientation, engage toi dans une mission qui te ressemble (modifié)",
      footerComponent:
        niveau <= 2 ? (
          <div className={classes.step_footer}>
            <RoundButton
              onClick={navigate('/favoris')}
              className={`${classes.round_button} ${classes.step4_round_button}`}
            >
              {isPersoCompleted ? 'Commencer' : 'Bientôt'}
            </RoundButton>
          </div>
        ) : (
          <div className={classes.step_footer}>
            <button onClick={navigate('/favoris')} className={classes.step_card_footer_text}>
              Mettre à jour
            </button>
          </div>
        ),
    },
    {
      headerComponent: <Triangles />,
      circleComponent: <span className={`${classes.step} ${classes.step_3}`}>{4}</span>,
      title: 'Mon Service National Universel',
      description: 'Evalue ton séjour de cohésion',
      footerComponent:
        niveau <= 3 ? (
          <div className={classes.step_footer}>
            <RoundButton
              onClick={navigate('/themes?type=professional')}
              className={`${classes.round_button} ${classes.step3_round_button}`}
            >
              {'Bientôt'}
            </RoundButton>
          </div>
        ) : (
          <div className={classes.step_footer}>
            <button onClick={navigate('/themes?type=professional')} className={classes.step_card_footer_text}>
              Mettre à jour
            </button>
          </div>
        ),
      disabled: niveau <= 3,
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
          <Info>
            <span className={classes.step_4}>
              Complète les différentes rubriques pour enrichir ton profil de compétences
            </span>
          </Info>
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
          <CardProgress progress={niveau} />
          <CardCompetence parcours={getParcours.data.globalCopmetences} />
        </Grid>
      </Grid>
      <Grid container className={'flex_center'}>
        <Grid item xl={12} className={classes.title}>
          Idées de métiers et de formations
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xl={12}>
          <Info>
            <span className={classes.step_4}>
              Grâce à tes réponses, voici des suggestions de métiers et de formations qui pourraient te convenir
            </span>
          </Info>
        </Grid>
      </Grid>
      {!(getFavorites.data.data && getFavorites.data.data.length) ? (
        <CompleteProfile onClick={onCompleteProfile} />
      ) : (
        <Grid className={classes.favoris_container} container>
          {getFavorites.data.data.map((favoris: any) => (
            <Grid key={favoris._id} item xl={3} lg={4} md={6} smd={12}>
              <JobCard showButtons={false} interested={favoris.interested} title={favoris.job.title} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = ({ parcours }: ReduxState) => ({
  parcours,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  parcoursRequest: (payload: ParcourParmas) => dispatch(ParcoursActions.parcoursRequest(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApis({ getParcours, getFavorites })(ProfileContainer));
