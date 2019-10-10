import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, Advisor, User } from 'reducers';
import {
 RouteComponentProps, Route, Switch, Redirect,
} from 'react-router-dom';
import ArrowSeConnect from 'assets_v3/Home/Arrow_SeConnect.svg';
import ArrowConnected from 'assets_v3/Home/Arrow_Connected.svg';
import arrowBody from 'assets_v3/Home/arrowBody.png';

import WithSub from 'components/ui/Sub/Sub';
import Grid from 'components/ui/Grid/Grid';
import Header from 'components_v3/Header/Header';
import CardHome from 'components_v3/CardHome';
import AdvisorGroupeContainer from 'containers/AdvisorGroupeConataier/AdvisorGroupeConataier';
import EditAdvisorProfile from 'containers/EditProfileContainer/editProfile';
import advisorActions from 'reducers/authAdvisor/login';
import HomeBackground from 'assets_v3/Home/ACCEUIL.svg';
import TTVFichier from 'assets_v3/Home/TTVFichier.svg';
import PictoModifier from 'assets_v3/Home/Picto_Modifier.svg';
import PictoValider from 'assets_v3/Home/Picto_Valider.svg';
import IlluMiroir from 'assets_v3/Home/Illu_Miroir.svg';
import classes from './AdvisorSpaceContainer.module.scss';
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

const AdvisorSpaceContainer = ({
  history,
  advisor,
  logoutAdvisor,
  user,
}: Props & DispatchProps) => {
  const navigate = (path: string) => () => {
    history.push(path);
  };

  const loginAdvisor = () => {
    history.push('/login/advisor');
  };

  function renderButton(text: string, color: string, onClick?: () => void) {
    return (
      <div
        onClick={onClick}
        className={classes.commencerBtn}
        style={{ backgroundColor: `${color}` }}
      >
        <span className={classes.btn_text}>{text}</span>
      </div>
    );
  }

  return (
    <div className={classes.home}>
      <Header HeaderProfile={false} showLogout={false} modeAdvisor />
      <div className={classes.bodyAdvisor}>
        <Switch>
          <Route path="/advisorSpace/mesGroupes" exact component={AdvisorGroupeContainer} />
          <Route path="/advisorSpace/edit_profile_advisor" component={EditAdvisorProfile} />
        </Switch>
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
)(AdvisorSpaceContainer);
