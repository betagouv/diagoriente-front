import React, { Fragment, useRef, useState } from 'react';
import {
 RouteComponentProps, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

// types
import { ReduxState, ApiReducer, IParcoursResponse } from 'reducers';
import FavorisContainer from 'containers/FavorisProContainer/FavorisContainer';

import JobsContainer from 'containers/JobsContainer/JobsConainer';
import Spinner from 'components_v3/ui/Spinner/Spinner';
import { useDidUpdate } from 'hooks';
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
import ExpertisesContainer from '../ExpertisesContainer';
import GameContainer from '../GameContainer/GameContainer';

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
  fetchingParcour: boolean;
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

const ProfileContainer = ({ match, fetchingParcour, parcours }: Props) => {
  const expertiseRef = useRef(null);
  const [OneCompetencesNoSetted, SetCompetencesNoSetted] = useState(
    parcours.data.skills
      .filter(item => item.type === 'personal')
      .flatMap(item => item.competences.flat(2))
      .some(item => item.value === 5),
  );
  useDidUpdate(() => {
    SetCompetencesNoSetted(
      parcours.data.skills
        .filter(item => item.type === 'personal')
        .flatMap(item => item.competences.flat(2))
        .some(item => item.value === 5),
    );
  }, [parcours.data.skills]);
   if (match.isExact) return <Redirect to="/profile/skills" />;
  return (
    <Fragment>
      <Header HeaderProfile showLogout />

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
                    component: fetchingParcour ? (
                      <div className={classes.containerSpinner}>
                        <Spinner />
                      </div>
                    ) : (
                      <MultiIcon
                        type="validate"
                        withText
                        footer
                        text="VALIDER"
                        width="35"
                        height="35"
                        textColor="#ffba27"
                        Iconcolor="#ffba27"
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
            render={props =>
              (OneCompetencesNoSetted ? (
                <Redirect to="/profile/intermediate" />
              ) : (
                <ThemesContainer
                  title="AJOUTE ET AUTO-ÉVALUE TES EXPÉRIENCES PROFESSIONNELLES"
                  {...props}
                  type="professional"
                  footerButtons={[
                    {
                      component: fetchingParcour ? (
                        <div className={classes.containerSpinner}>
                          <Spinner />
                        </div>
                      ) : (
                        <MultiIcon
                          type="validate"
                          withText
                          text="VALIDER"
                          width="35"
                          footer
                          height="35"
                          textColor="#ffba27"
                          Iconcolor="#ffba27"
                        />
                      ),
                      key: 'valider',
                    },
                  ]}
                />
              ))
            }
          />
          <Route
            path="/profile/intermediate"
            exact
            render={props => (
              <ExpertisesContainer
                title="GRADUE TES COMPÉTENCES PERSONNELLES"
                {...props}
                type="professional"
                ref={expertiseRef}
                footerButtons={[
                  {
                    component: fetchingParcour ? (
                      <div className={classes.containerSpinner}>
                        <Spinner />
                      </div>
                    ) : (
                      <MultiIcon
                        type="validate"
                        withText
                        text="valider"
                        width="35"
                        footer
                        height="35"
                        textColor="#ffba27"
                        Iconcolor="#ffba27"
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
            render={props =>
              (OneCompetencesNoSetted ? (
                <Redirect to="/profile/intermediate" />
              ) : (
                <FavorisContainer
                  {...props}
                  title="SELECTIONNE TES INTÉRÊTS PROFESSIONNELS ET CLASSE LES PAR ORDRE DE PRÉFÉRENCE DANS LA COLONNE DE DROITE"
                  footerButtons={[
                    {
                      component: fetchingParcour ? (
                        <div className={classes.containerSpinner}>
                          <Spinner />
                        </div>
                      ) : (
                        <MultiIcon
                          type="validate"
                          withText
                          text="VALIDER"
                          width="35"
                          footer
                          height="35"
                          textColor="#ffba27"
                          Iconcolor="#ffba27"
                        />
                      ),
                      key: 'valider',
                    },
                  ]}
                />
              ))
            }
          />
          <Route
            path="/profile/jobs"
            exact
            render={props =>
              (OneCompetencesNoSetted ? (
                <Redirect to="/profile/intermediate" />
              ) : (
                <JobsContainer
                  title="DÉCOUVRE ET AJOUTE LES MÉTIERS QUI T’INTÉRESSENT"
                  {...props}
                  footerButtons={[
                    {
                      component: fetchingParcour ? (
                        <div className={classes.containerSpinner}>
                          <Spinner />
                        </div>
                      ) : (
                        <MultiIcon
                          type="validate"
                          withText
                          text="VALIDER"
                          width="35"
                          footer
                          height="35"
                          textColor="#ffba27"
                          Iconcolor="#ffba27"
                        />
                      ),
                      key: 'valider',
                    },
                  ]}
                />
              ))
            }
          />
          <Route
            path="/profile/game"
            exact
            render={props => (
              <GameContainer
                {...props}
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
  fetchingParcour: parcours.fetching,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
  parcoursRequest: (payload: ParcoursParams) => dispatch(ParcoursActions.parcoursRequest(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApis({ getParcours, getFavorites, addFavorites: createFavorites })(ProfileContainer));
