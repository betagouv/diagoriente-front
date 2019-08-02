import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { RouteComponentProps } from 'react-router';
import { ReduxState, Advisor } from 'reducers';

import WithSub from '../../components/ui/Sub/Sub';
import Button from '../../components/buttons/RoundButton/RoundButton';
import Grid from '../../components/ui/Grid/Grid';
import QuestionMarks from '../../components/shapes/questionMark/questionMark';
import Circles from '../../components/shapes/circles/circles';
import Triangles from '../../components/shapes/triangles/triangles';
// import Stars from '../../components/shapes/stars/stars';
import StepCard from '../../components/cards/StepCard/StepCard';
import ApparationCard from '../../components_v3/ApparationCard/index';
import GraduationLevel from '../../components_v3/GraduationLevel';
import ColoredLine from '../../components_v3/ColoredLine/ColoredLine';
import Header from '../../components_v3/Header/Header';
import playIcon from '../../assets/homeasset/play.svg';
import Progress from '../../components/ui/progressBars/ProgressBarCompetence/ProgressCompetence';
import HomeLogo from '../../assets/homeasset/im-undraw-career-progress-ivdb-1.png';
import logo from '../../assets/icons/logo/Diagoriente_Logo.svg';
import start_arrow from '../../assets/icons/start-arrow.png';
import O from '../../assets/icons/svg/Ocolor.svg';
import loginIcon from '../../assets/icons/svg/login.svg';
import logoutIcon from '../../assets/icons/svg/logout.svg';

import CardHome from '../..//components_v3/CardHome';
import advisorActions from '../../reducers/authAdvisor/login';

import classNames from '../../utils/classNames';
import classes from './home.module.scss';

const steps = [
  {
    headerComponent: <QuestionMarks />,
    circleComponent: <span className={`${classes.step} ${classes.step_1}`}>{1}</span>,
    description: 'Découvre comment identifier tes compétences en jouant',
  },
  {
    headerComponent: <Circles />,
    circleComponent: <span className={`${classes.step} ${classes.step_2}`}>{2}</span>,
    description: 'Complète ton profil et découvre ta carte de compétences',
  },
  {
    headerComponent: <Triangles />,
    circleComponent: <span className={`${classes.step} ${classes.step_3}`}>{3}</span>,
    description: 'Diagoriente te propose des pistes pour ton orientation',
  },
];

interface Props extends RouteComponentProps {
  advisor: Advisor;
  logoutAdvisor: () => void;
}

const HomeContainer = ({ history, advisor, logoutAdvisor }: Props) => {
  const navigate = () => {
    history.push('/profile');
  };

  const loginAdvisor = () => {
    history.push('/login/advisor');
  };

  return (
    <div className={classes.home}>
      <Header />
      <div className={classes.contentContainer}>
        <Grid container>
          <Grid className={classes.headerContainer} item xl={12}>
            <button className={classes.logout} onClick={advisor.advisor ? logoutAdvisor : loginAdvisor}>
              <span className={classes.logout_text}>
                {!advisor.advisor
                  ? 'Connexion Pro'
                  : `${advisor.advisor.profile.firstName} ${advisor.advisor.profile.lastName}`}
              </span>
              <div className={classes.logout_icon_container}>
                <img className={classes.logout_icon} src={advisor.advisor ? logoutIcon : loginIcon} />
              </div>
            </button>
          </Grid>
        </Grid>
        <div className={classes.content}>
          <img src={HomeLogo} alt={'homeLogo'} className={classes.logoHome} />
          <WithSub
            className={classes.WithSub}
            title1={'Trouve ta voie'}
            subTitle={'Révèle tes compétences et engage toi dans ton orientation'}
          />
          <div className={classes.groupBotton}>
            <div onClick={navigate} className={classes.commencerBtn}>
              <span className={classes.btn_text}>Commencer</span>
              <img src={start_arrow} alt="start" />
            </div>
            <div onClick={navigate} className={classes.commencerBtn}>
              <span className={classes.btn_text}>Commencer</span>
            </div>
          </div>
        </div>
      </div>

      <Grid container className={classes.cardContainer}>
        {steps.map((step, i) => (
          <Grid key={i} className={classes.step_card} item xl={3} md={6} smd={12}>
            <CardHome icon={playIcon} description={'Découvre comment identifier '} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ authAdvisor }: ReduxState) => ({
  advisor: authAdvisor.advisor,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  logoutAdvisor: () => dispatch(advisorActions.logoutAdvisor()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);
