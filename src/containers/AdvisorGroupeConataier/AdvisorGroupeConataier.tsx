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
import withApis, { ApiComponentProps } from 'hoc/withApi';
import { useDidMount } from 'hooks';

import WithSub from 'components/ui/Sub/Sub';
import Grid from 'components/ui/Grid/Grid';
import Header from 'components_v3/Header/Header';
import CardHome from 'components_v3/CardHome';
import { listGroupe, IUpdateParcoursParams, ListGroupResponse } from 'requests';
import GroupeCard from 'components_v3/GroupeCard';
import advisorActions from 'reducers/authAdvisor/login';
import HomeBackground from 'assets_v3/Home/ACCEUIL.svg';
import TTVFichier from 'assets_v3/Home/TTVFichier.svg';
import PictoModifier from 'assets_v3/Home/Picto_Modifier.svg';
import PictoValider from 'assets_v3/Home/Picto_Valider.svg';
import IlluMiroir from 'assets_v3/Home/Illu_Miroir.svg';
import classes from './AdvisorGroupeConataier.module.scss';
import { showTuto, tutoShowed } from '../../utils/localStorage';

interface MapToProps {
  advisor: Advisor;
  user: User;
}
interface IDispatchToProps {
  logoutAdvisor: () => void;
}
interface Props
  extends ApiComponentProps<{ get: typeof listGroupe }>,
    MapToProps,
    IDispatchToProps,
    RouteComponentProps {}
interface DispatchProps {
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
  logoutAdvisor: () => void;
}

const AdvisorGroupe = ({ advisor, user, get }: Props & DispatchProps) => {
  useDidMount(() => {
    console.log('did mount');
    if (advisor.advisor) {
      get.call({ advisorId: advisor.advisor._id });
    }
  });

  const nbrGroupe = get.data.data ? get.data.data.length : 0;
  console.log('get', get.data.data);
  return (
    <div className={classes.GroupContainer}>
      <div className={classes.NewGroup} />
      <div className={classes.contentGroup}>
        <div className={classes.testGroupe}>
          <div className={classes.groupeDisponible}>
            {nbrGroupe === 0 ? 'Aucun groupe disponible' : `${nbrGroupe} groupe(s) disponible(s)`}
          </div>
          {get.data.data
            && get.data.data.map(item => (
              <GroupeCard title={item.title} code={item.code} users={item.users} />
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authAdvisor, authUser }: ReduxState): MapToProps => ({
  advisor: authAdvisor.advisor,
  user: authUser.user,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  logoutAdvisor: () => dispatch(advisorActions.logoutAdvisor()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApis({ get: listGroupe })(AdvisorGroupe));
