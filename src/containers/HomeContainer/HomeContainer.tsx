import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { RouteComponentProps } from 'react-router';
import { ReduxState, Advisor } from 'reducers';

import WithSub from '../../components/ui/Sub/Sub';
import Grid from '../../components/ui/Grid/Grid';

// import Stars from '../../components/shapes/stars/stars';

import Header from '../../components_v3/Header/Header';

import Illu_Miroir from '../../assets_v3/Home/Illu_Miroir.svg';
import Arrow_SeConnect from '../../assets_v3/Home/Arrow_SeConnect.svg';

import CardHome from '../../components_v3/CardHome';
import advisorActions from '../../reducers/authAdvisor/login';
import Picto_PlayButton from '../../assets_v3/Home/Picto_PlayButton.svg';
import Picto_Modifier from '../../assets_v3/Home/Picto_Modifier.svg';
import Picto_Valider from '../../assets_v3/Home/Picto_Valider.svg';

import classes from './home.module.scss';

const steps = [
  {
    icon: Picto_PlayButton,
    description: 'Découvre comment identifier tes compétences en jouant',
  },
  {
    icon: Picto_Modifier,
    description: 'Complète ton profil et découvre ta carte de compétences',
  },
  {
    icon: Picto_Valider,
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
        <Grid container style={{ padding: '0 10px' }}>
          <Grid className={classes.headerContainer} item xl={12}>
            <button
              className={classes.logout}
              onClick={advisor.advisor ? logoutAdvisor : loginAdvisor}
            >
              <span className={classes.logout_text}>
                {!advisor.advisor
                  ? 'Connexion Pro'
                  : `${advisor.advisor.profile.firstName} ${advisor.advisor.profile.lastName}`}
              </span>
              {/*  <div className={classes.logout_icon_container}>
                <img className={classes.logout_icon} src={advisor.advisor ? logoutIcon : loginIcon} />
              </div> */}
            </button>
          </Grid>
        </Grid>
        <div className={classes.content}>
          <img src={Illu_Miroir} alt="homeLogo" className={classes.logoHome} />
          <WithSub
            className={classes.WithSub}
            title1="Trouve ta voie"
            subTitle="Révèle tes compétences et engage toi dans ton orientation"
          />
          <div className={classes.groupBotton}>
            <div onClick={navigate} className={classes.commencerBtn}>
              <img src={Arrow_SeConnect} alt="start" className={classes.buttonArrow} />

              <span className={classes.btn_text}>S'inscrire</span>
            </div>
            <div onClick={navigate} className={classes.commencerBtn}>
              <img src={Arrow_SeConnect} alt="start" className={classes.buttonArrow} />
              <span className={classes.btn_text}>Se connecter</span>
            </div>
          </div>
        </div>
      </div>

      <Grid container className={classes.cardContainer}>
        {steps.map((step, i) => (
          <Grid key={i} className={classes.step_card} item xl={3} md={6} smd={12}>
            <CardHome icon={step.icon} description={step.description} />
            {/*             {i !== 2 && <img className={classes.arrow} src={Picto_Fleche} alt={'fleche'} />}
             */}
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
