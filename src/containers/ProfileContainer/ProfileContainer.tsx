import React, { Fragment } from 'react';
import {
 RouteComponentProps, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

// types
import { ReduxState, ApiReducer, IParcoursResponse } from 'reducers';
import FavorisContainer from 'containers/FavorisProContainer/FavorisContainer';
import SideBar from '../../components_v3/ui/SideBar/SideBar';
import Header from '../../components_v3/Header/Header';
// containers

import ThemesContainer from '../ThemesContainer/ThemesContainer';
import MultiIcon from '../../components_v3/icons/multiIcon/multiIcon';

// api
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import { getParcours, getFavorites, createFavorites } from '../../requests';

// actions
import ParcoursActions from '../../reducers/parcours';

// css
import classes from './profileContainer.module.scss';
import SkillsContainer from '../SkillsContainer/SkillsContainer';
import GameContainer from 'containers/GameContainer/GameContainer';
import CarteContainer from 'containers/CarteContainer/CarteContainer';
import JobsContainer from 'containers/JobsContainer/JobsConainer';
import ExpertisesContainer from '../ExpertisesContainer';

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

const ProfileContainer = ({ match }: Props) => {
  if (match.isExact) return <Redirect to="/profile/skills" />;

  return (
    <Fragment>
      <Header HeaderProfile />

      <div className={classes.sidebar_container}>
        <SideBar />
      </div>
      <div className={classes.content}>
        <Switch>
          <Route
            path="/profile/skills"
            exact
            render={props => (
              <SkillsContainer
                {...props}
                footerButtons={[
                  {
                    component: (
                      <MultiIcon
                        type="print"
                        withText
                        footer
                        text="IMPRIMER"
                        width="35"
                        height="35"
                        textColor="#7992BF"
                        Iconcolor="#7992BF"
                      />
                    ),
                    key: 'print',
                  },
                  {
                    component: (
                      <MultiIcon
                        type="download"
                        withText
                        footer
                        text="TÉLÉCHARGER"
                        width="35"
                        height="35"
                        textColor="#7992BF"
                        Iconcolor="#7992BF"
                      />
                    ),
                    key: 'download',
                  },
                ]}
              />
            )}
          />
          <Route
            path="/profile/perso"
            exact
            render={props => (
              <ThemesContainer
                {...props}
                title="AJOUTE ET AUTO-ÉVALUE TES EXPÉRIENCES PERSONNELLES"
                type="personal"
                footerButtons={[
                  {
                    component: (
                      <MultiIcon
                        type="validate"
                        withText
                        footer
                        text="VALIDER"
                        width="35"
                        height="35"
                        textColor="#7992BF"
                        Iconcolor="#7992BF"
                      />
                    ),
                    key: 'valider',
                  },
                ]}
              />
            )}
          />
          <Route
            path="/profile/pro"
            exact
            render={props => (
              <ThemesContainer
                title="AJOUTE ET AUTO-ÉVALUE TES EXPÉRIENCES PROFESSIONNELLES"
                {...props}
                type="professional"
                footerButtons={[
                  {
                    component: (
                      <MultiIcon
                        type="validate"
                        withText
                        text="VALIDER"
                        width="35"
                        footer
                        height="35"
                        textColor="#7992BF"
                        Iconcolor="#7992BF"
                      />
                    ),
                    key: 'valider',
                  },
                ]}
              />
            )}
          />
          <Route
            path="/profile/intermediate"
            exact
            render={props => (
              <ExpertisesContainer
                title="GRADUE TES COMPÉTENCES PERSONNELLES"
                {...props}
                type="professional"
                footerButtons={[
                  {
                    component: (
                      <MultiIcon
                        type="validate"
                        withText
                        text="valider"
                        width="35"
                        footer
                        height="35"
                        textColor="#7992BF"
                        Iconcolor="#7992BF"
                      />
                    ),
                    key: 'valider',
                  },
                ]}
              />
            )}
          />
          <Route
            path="/profile/favoris"
            exact
            render={props => (
              <FavorisContainer
                title="SELECTIONNE TES INTÉRÊTS PROFESSIONNELS ET CLASSE LES PAR ORDRE DE PRÉFÉRENCE DANS LA COLONNE DE DROITE"
                {...props}
                footerButtons={[
                  {
                    component: (
                      <MultiIcon
                        type="validate"
                        withText
                        text="VALIDER"
                        width="35"
                        footer
                        height="35"
                        textColor="#7992BF"
                        Iconcolor="#7992BF"
                      />
                    ),
                    key: 'valider',
                  },
                ]}
              />
            )}
          />
        </Switch>
      </div>
    </Fragment>
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
