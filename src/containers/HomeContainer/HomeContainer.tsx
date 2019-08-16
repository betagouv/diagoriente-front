import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { RouteComponentProps } from 'react-router';
import { ReduxState, Advisor, User } from 'reducers';

import PictoPlayButton from 'assets_v3/Home/Picto_PlayButton.svg';
import PictoModifier from 'assets_v3/Home/Picto_Modifier.svg';
import PictoValider from 'assets_v3/Home/Picto_Valider.svg';
import IlluMiroir from 'assets_v3/Home/Illu_Miroir.svg';
import ArrowSeConnect from 'assets_v3/Home/Arrow_SeConnect.svg';
import ArrowConnected from 'assets_v3/Home/Arrow_Connected.svg';
import WithSub from '../../components/ui/Sub/Sub';
import Grid from '../../components/ui/Grid/Grid';

// import Stars from '../../components/shapes/stars/stars';

import Header from '../../components_v3/Header/Header';
import CardHome from '../../components_v3/CardHome';
import advisorActions from '../../reducers/authAdvisor/login';
import classes from './home.module.scss';

const steps = [
  {
    icon: PictoPlayButton,
    description: 'Découvre comment identifier tes compétences en jouant',
  },
  {
    icon: PictoModifier,
    description: 'Complète ton profil et découvre ta carte de compétences',
  },
  {
    icon: PictoValider,
    description: 'Diagoriente te propose des pistes pour ton orientation',
  },
];

interface Props extends RouteComponentProps {
  advisor: Advisor;
  logoutAdvisor: () => void;
  user: User;
}

const HomeContainer = ({
 history, advisor, logoutAdvisor, user,
}: Props) => {
  const navigate = () => {
    history.push('/profile');
  };

  const loginAdvisor = () => {
    history.push('/login/advisor');
  };
  console.log(user.user);
  return (
    <div className={classes.home}>
      <Header HeaderProfile={false} showLogout={false} />
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
          <img src={IlluMiroir} alt="homeLogo" className={classes.logoHome} />
          <WithSub
            className={classes.WithSub}
            title1="Trouve ta voie"
            subTitle="Révèle tes compétences et engage toi dans ton orientation"
          />
          {!user.user ? (
            <div className={classes.groupBotton}>
              <div onClick={navigate} className={classes.commencerBtn}>
                <img src={ArrowSeConnect} alt="start" className={classes.buttonArrow} />

                <span className={classes.btn_text}>S'inscrire</span>
              </div>
              <div onClick={navigate} className={classes.commencerBtn}>
                <img src={ArrowSeConnect} alt="start" className={classes.buttonArrow} />
                <span className={classes.btn_text}>Se connecter</span>
              </div>
            </div>
          ) : (
            <div className={classes.groupBottonCommencer}>
              <div onClick={navigate} className={classes.commencerBtn}>
                <img src={ArrowConnected} alt="start" className={classes.buttonArrow} />
                <span className={classes.btn_text}>Commencer</span>
              </div>
            </div>
          )}
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

const mapStateToProps = ({ authAdvisor, authUser }: ReduxState) => ({
  advisor: authAdvisor.advisor,
  user: authUser.user,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  logoutAdvisor: () => dispatch(advisorActions.logoutAdvisor()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);
