import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { ReduxState, Advisor, User } from 'reducers';

import ArrowSeConnect from 'assets_v3/Home/Arrow_SeConnect.svg';
import ArrowConnected from 'assets_v3/Home/Arrow_Connected.svg';
import arrowBody from 'assets_v3/Home/arrowBody.png';

import WithSub from 'components/ui/Sub/Sub';
import Grid from 'components/ui/Grid/Grid';
import Header from 'components_v3/Header/Header';
import CardHome from 'components_v3/CardHome';

import advisorActions from 'reducers/authAdvisor/login';
import HomeBackground from 'assets_v3/Home/ACCEUIL.svg';
import TTVFichier from 'assets_v3/Home/TTVFichier.svg';
import PictoModifier from 'assets_v3/Home/Picto_Modifier.svg';
import PictoValider from 'assets_v3/Home/Picto_Valider.svg';
import IlluMiroir from 'assets_v3/Home/Illu_Miroir.svg';
import classes from './newHome.module.scss';
import { showTuto, tutoShowed } from '../../utils/localStorage';

interface Props extends RouteComponentProps {
  advisor: Advisor;
  logoutAdvisor: () => void;
  user: User;
}

interface DispatchProps {
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
  logoutAdvisor: () => void;
}

const NewHomeContainer = ({
 history, advisor, logoutAdvisor, user,
}: Props & DispatchProps) => {
  const navigate = (path: string) => () => {
    history.push(path);
  };

  const loginAdvisor = () => {
    history.push('/login/advisor');
  };

  function renderButton(text: string, color: string, onClick?: () => void, modeConnected = false) {
    console.log('modeCommencer', modeConnected);
    return (
      <div
        onClick={onClick}
        className={modeConnected ? classes.longBtn : classes.commencerBtn}
        style={{ backgroundColor: `${color}` }}
      >
        <span className={classes.btn_text}>{text}</span>
      </div>
    );
  }

  return (
    <div className={classes.home}>
      <Header HeaderProfile={false} showLogout={false} />
      <div
        className={classes.contentContainer}
        style={{
          backgroundImage: `url(${HomeBackground})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={classes.homeContent}>
          <div className={classes.bigTextContainer}>
            {/*   <span className={classes.bigText}>trouve </span>
						<span className={classes.bigText}>ta voie</span> */}
            <img src={TTVFichier} alt="TrouveTaVoie" />
          </div>

          <div className={classes.groupBottonCommencer}>
            {!user.user
              && renderButton(
                'INSCRIPTION',
                '#24d0fd',
                navigate('/login/user?from=%2Fprofile&register=true'),
              )}
            {!user.user && renderButton('CONNEXION', '#fc1262', navigate('/login/user'))}
            {user.user && renderButton('Commencer', '#fc1262', navigate('/profile'), true)}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '30%',
            }}
          >
            <span className={classes.titleDescription}>
              Révèle tes compétences et engage toi dans ton orientation
            </span>
            <div style={{ fontSize: '13px', margin: '10px 0px', color: '#6f7071' }}>
              <img
                src={arrowBody}
                alt="arrow"
                style={{ width: '11px', height: '13px', marginRight: '10px' }}
              />
              <span>Découvre comment identifier tes compétences en jouant </span>
            </div>
            <div style={{ fontSize: '13px', margin: '10px 0px', color: '#6f7071' }}>
              <img
                src={arrowBody}
                alt="arrow"
                style={{ width: '11px', height: '13px', marginRight: '10px' }}
              />
              <span>Complète ton profil et découvre ta carte de compétences </span>
            </div>
            <div style={{ fontSize: '13px', margin: '10px 0px', color: '#6f7071' }}>
              <img
                src={arrowBody}
                alt="arrow"
                style={{ width: '11px', height: '13px', marginRight: '10px' }}
              />
              <span>Diagoriente te propose des pistes pour ton orientation</span>
            </div>
          </div>
        </div>
      </div>
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
)(NewHomeContainer);
