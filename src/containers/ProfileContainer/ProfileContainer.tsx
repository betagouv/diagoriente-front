import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

// types
import { ReduxState, ApiReducer, IParcoursResponse } from 'reducers';

import SideBar from '../../components_v3/ui/SideBar/SideBar';

// containers

import ThemesContainer from '../ThemesContainer/ThemesContainer';

// components
import Grid from '../../components/ui/Grid/Grid';
import Info from '../../components/ui/Info/Info';
import StepCard from '../../components/cards/StepCard/StepCard';
import QuestionMarks from '../../components/shapes/questionMark/questionMark';
import Circles from '../../components/shapes/circles/circles';
import Triangles from '../../components/shapes/triangles/triangles';
import Stars from '../../components/shapes/stars/stars';
import CardProgress from '../../components/cards/CardProgress/CardProgress';
import RoundButton from '../../components/buttons/RoundButton/RoundButton';
import CardCompetence from '../../components/cards/CardCompetence/Competence';
import Header from '../../layout/Header/Header';
import CompleteProfile from '../../components/ui/CompleteProfile/CompleteProfile';
import Spinner from '../../components/ui/Spinner/Spinner';
import Card from '../../components/cards/Card/Card';
import ReactTooltip from 'react-tooltip';
import { isEmpty } from 'lodash';
// hooks
import { useDidMount } from '../../hooks';

// api
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import { getParcours, getFavorites, createFavorites } from '../../requests';

// actions
import ParcoursActions from '../../reducers/parcours';

// css
import classes from './profileContainer.module.scss';
import JobCard from '../../components/cards/JobCard/JobCard';
import ContinueButton from '../../components/buttons/ContinueButtom/ContinueButton';

import { pdf } from '../../utils/pdf';
import SkillsContainer from '../SkillsContainer/SkillsContainer';

interface ParcoursParams {
  completed?: boolean;
  createdAt?: string;
  families?: [];
  skills?: any[];
  updatedAt?: string;
  userId?: string;
  _id?: string;
  played: boolean;
}

interface DispatchToProps {
  parcoursRequest: (payload: ParcoursParams) => void;
}

interface MapToProps {
  parcours: ApiReducer<IParcoursResponse>;
}

interface Props
  extends RouteComponentProps,
    ApiComponentProps<{
      getParcours: typeof getParcours;
      getFavorites: typeof getFavorites;
      addFavorites: typeof createFavorites;
    }>,
    MapToProps,
    DispatchToProps {}

const ProfileContainer = ({
  history,
  getParcours,
  parcours,
  parcoursRequest,
  getFavorites,
  addFavorites,
  match,
}: Props) => {
  if (match.isExact) return <Redirect to={'/profile/skills'} />;

  return (
    <>
      <div className={classes.header}>header</div>

      <div className={classes.sidebar_container}>
        <SideBar />
      </div>
      <div className={classes.content}>
        <Switch>
          <Route path={'/profile/skills'} exact component={SkillsContainer} />
          <Route
            path={'/profile/perso'}
            exact
            render={props => (
              <ThemesContainer
                {...props}
                title={'AJOUTE ET AUTO-ÉVALUE TES EXPÉRIENCES PERSONNELLES'}
                type={'personal'}
                footerButtons={['valider']}
              />
            )}
          />
          <Route
            path={'/profile/pro'}
            exact
            render={props => (
              <ThemesContainer
                title={'AJOUTE ET AUTO-ÉVALUE TES EXPÉRIENCES PROFESSIONNELLES'}
                {...props}
                type={'professional'}
                footerButtons={['valider']}
              />
            )}
          />
        </Switch>
      </div>
    </>
  );
};

const mapStateToProps = ({ parcours }: ReduxState): MapToProps => ({
  parcours,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  parcoursRequest: (payload: ParcoursParams) => dispatch(ParcoursActions.parcoursRequest(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApis({ getParcours, getFavorites, addFavorites: createFavorites })(ProfileContainer));
