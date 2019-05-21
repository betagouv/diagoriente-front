import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import jsPDF from 'jspdf';
// assets
import body from '../../assets/pdf/body.png';
import logoRF from '../../assets/pdf/rf.png';
import logoSNU from '../../assets/pdf/snu.png';
import starEmpty from '../../assets/pdf/star-empty.png';
import starFull from '../../assets/pdf/star-full.png';
import check from '../../assets/pdf/check.png';

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
import ContinueButton from '../../components/buttons/ContinueButtom/ContinueButton';

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
  authUser: any;
}

type Props = RouteComponentProps &
  ApiComponentProps<{ getParcours: typeof getParcours; getFavorites: typeof getFavorites }> &
  MapToProps;

const ProfileContainer = ({ history, getParcours, parcours, parcoursRequest, getFavorites, authUser }: Props) => {
  const navigate = (path: string) => () => {
    history.push(path);
  };

  useDidMount(() => {
    if (parcours.data._id) {
      getParcours.call(parcours.data._id);
    }
    getFavorites.call();
  });

  const gameHandler = () => {
    parcoursRequest({ played: true });
    navigate('/game')();
  };
  const onNavigateToJobs = () => {
    navigate('/jobs')();
  };

  const persoSkills = parcours.data.skills.filter(skill => skill.theme.type === 'personal');
  const proSkills = parcours.data.skills.filter(skill => skill.theme.type === 'professional');

  const isPersoCompleted =
    persoSkills.length > 0 && !persoSkills.find(skill => !(skill.activities.length && skill.competences.length));
  const isProCompleted =
    proSkills.length > 0 && !proSkills.find(skill => !(skill.activities.length && skill.competences.length));

  let niveau = 0;
  if (parcours.data.played) niveau = 1;
  if (niveau === 1 && isPersoCompleted) niveau = 2;
  if (niveau === 2 && parcours.data.families.length) niveau = 3;
  if (niveau === 3 && isProCompleted) niveau = 4;

  const onCompleteProfile = () => {
    let action = navigate('/jobs');
    switch (niveau) {
      case 0:
        action = gameHandler;
        break;
      case 1:
        action = navigate('/themes');
        break;
      case 2:
        action = navigate('/favoris');
        break;
      case 3:
        action = navigate('/themes?type=professional');
        break;
    }
    action();
  };

  const steps = [
    {
      headerComponent: <QuestionMarks />,
      circleComponent: <span className={`${classes.step} ${classes.step_1}`}>{1}</span>,
      title: 'Mini-jeu',
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
              {niveau < 1 ? 'Bientôt' : 'Commencer'}
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
      description: 'Trouve des pistes d’orientation',
      footerComponent:
        niveau <= 2 ? (
          <div className={classes.step_footer}>
            <RoundButton
              onClick={navigate('/favoris')}
              className={`${classes.round_button} ${classes.step4_round_button}`}
            >
              {niveau < 2 ? 'Bientôt' : 'Commencer'}
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
              {niveau < 3 ? 'Bientôt' : 'Commencer'}
            </RoundButton>
          </div>
        ) : (
          <div className={classes.step_footer}>
            <button onClick={navigate('/themes?type=professional')} className={classes.step_card_footer_text}>
              Mettre à jour
            </button>
          </div>
        ),
      disabled: niveau <= 2,
    },
  ];

  const pdf = async () => {
    const doc = new jsPDF("l", "pt", "a4", true as any);
    /* doc.addFileToVFS('../../assets/pdf/fonts/Lato-Bold.ttf', 'Lato');
    doc.addFont('Lato-Bold.ttf', 'latoBold', 'normal');
    doc.setFont('latoBold'); */
    const skills = parcours.data.skills;
    const themesPerso: any = [];
    let skillPro: any = {};
    skills.forEach(skill => {
      if (skill.theme.type === "personal") themesPerso.push(skill.theme.title);
      else skillPro = skill;
    });
    const competences = getParcours.data.globalCopmetences;
    const themePro = skillPro.theme.title;
    const actiPro = skillPro.activities.map((acti: any) => acti.title);
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    const background = document.createElement("img");
    background.setAttribute("src", body);
    doc.addImage(background, "PNG", 25, 25, width - 50, height - 50, '', 'FAST');
    const firstName: string = authUser.user.user.profile.firstName.toUpperCase();
    const lastName = authUser.user.user.profile.lastName.toUpperCase();

    doc.setFontSize(12);
    doc.setTextColor(0, 49, 137);
    doc.setFont("Helvetica", "bold");
    doc.text(`DE ${firstName} ${lastName}`, 350, height / 3.4, { charSpace: 2 });
    const SNU = document.createElement("img");
    SNU.setAttribute("src", logoSNU);
    doc.addImage(SNU, "PNG", 80, 100, 90, 80, '', 'FAST');
    const RF = document.createElement("img");
    RF.setAttribute("src", logoRF);
    doc.addImage(RF, "PNG", width - 180, 100, 90, 80, '', 'FAST');
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 49, 137);
    doc.text("Mes expériences", 85, 235, { charSpace: 0 });
    const checked = document.createElement("img");
    checked.setAttribute("src", check);
    const fullStar = document.createElement("img");
    fullStar.setAttribute("src", starFull);
    const emptyStar = document.createElement("img");
    emptyStar.setAttribute("src", starEmpty);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    for (let i = 0; i < themesPerso.length; i++) {
      doc.addImage(checked, "PNG", 85, 250 + i * 15, 5, 5, '', 'FAST');
      doc.text(themesPerso[i], 95, 255 + i * 15);
    }
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 49, 137);
    doc.text("Mon SNU : ce que j'apprécie le plus", 85, 355, { maxWidth: 90 });
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    let lines = 0;
    for (let i = 0; i < actiPro.length; i++) {
      const splitText = doc.splitTextToSize(actiPro[i], 100);
      doc.addImage(checked, "PNG", 85, 385 + lines * 10, 5, 5, '', 'FAST');
      doc.text(splitText, 95, 390 + lines * 10, { maxWidth: 100 });
      lines += splitText.length;
    }

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);

    for (let i = 0; i < 10; i++) {
      const row = i >= 5 ? i - 5 : i;
      const col = i >= 5 ? 260 : 0;
      const x = 185 + col;
      const y = 230 + row * 40;
      for (let j = 1; j <= 4; j++) {
        doc.addImage(j <= competences[i].value ? starFull : starEmpty, "PNG", x + j * 15, y - 10, 11, 11, '', 'FAST');
      }
      doc.text(competences[i].title, x + 82, y);
    }


    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Fait à ………………………………………………………', 480, 470);
    doc.text('Le …………………………………………………………', 480, 490);
    doc.text('Signature', 480, 510);

    doc.save('Carte de compétences.pdf');
  };

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
          <CardCompetence parcours={getParcours.data.globalCopmetences} pdfDownload={pdf} />
          
        </Grid>
      </Grid>
      <Grid container className={'flex_center'}>
        <Grid item xl={12} className={classes.title}>
          Mes pistes d’orientation
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xl={12}>
          <Info>
            <span className={classes.step_4}>
              Grâce à tes réponses, voici des suggestions de métiers qui pourraient te convenir
            </span>
          </Info>
        </Grid>
      </Grid>
      {!(getFavorites.data.data && getFavorites.data.data.length) ? (
        <CompleteProfile onClick={onCompleteProfile} />
      ) : (
        <Grid className={classes.favoris_container} container>
          {getFavorites.data.data
            .filter((favoris: any) => favoris.interested)
            .map((favoris: any) => (
              <Grid key={favoris._id} item xl={4} lg={6} md={12} smd={12}>
                <JobCard
                  showButtons={false}
                  interested={favoris.interested}
                  title={favoris.job.title}
                  job={favoris.job}
                />
              </Grid>
            ))}

          <div className={classes.btn_container_jobs}>
            <ContinueButton className={classes.btn_jobs} onClick={onNavigateToJobs} label="Modifier" />
          </div>
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = ({ parcours, authUser }: ReduxState) => ({
  parcours,
  authUser,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  parcoursRequest: (payload: ParcourParmas) => dispatch(ParcoursActions.parcoursRequest(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApis({ getParcours, getFavorites })(ProfileContainer));
