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
import StepCard from '../../components/cards/StepCard/StepCard';

import logo from '../../assets/icons/logo/diagoriente-logo-01.png';
import start_arrow from '../../assets/icons/start-arrow.png';
import O from '../../assets/icons/svg/O.svg';
import loginIcon from '../../assets/icons/svg/login.svg';
import logoutIcon from '../../assets/icons/svg/logout.svg';

import advisorActions from '../../reducers/authAdvisor/login';

import classNames from '../../utils/classNames';
import classes from './home.module.scss';

const steps = [
  {
    headerComponent: <QuestionMarks />,
    circleComponent: <span className={`${classes.step} ${classes.step_1}`}>{1}</span>,
    description: 'Dècouvre comment identifier tes compétences en jouant',
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
      <div className={classes.contentContainer}>
        <Grid container>
          <Grid className={classes.headerContainer} item xl={12}>
            <div className={classes.logoWrapper}>
              <img src={logo} alt="Logo" className={classes.logo} />
            </div>
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
          <Grid key={i} className={classes.step_card} item xl={4} md={6} smd={12}>
            <StepCard className={classes.card_content} {...step} />
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
