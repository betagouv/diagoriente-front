import React, {
 Fragment, useRef, useEffect, useState,
} from 'react';
import {
 RouteComponentProps, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

// types
import { ReduxState, ApiReducer, IParcoursResponse } from 'reducers';
// containers
import FavorisContainer from 'containers/FavorisProContainer/FavorisContainer';
import ThemesContainer from 'containers/ThemesContainer/ThemesContainer';
import SkillsContainer from 'containers/SkillsContainer/SkillsContainer';
import ExpertisesContainer from 'containers/ExpertisesContainer';
import MesDemarches from 'containers/MesDemarchesContainer/MesDemarchesContainer';
import JobsContainer from 'containers/JobsContainer/JobsConainer';
import Spinner from 'components_v3/ui/Spinner/Spinner';
import SideBar from 'components_v3/ui/SideBar/SideBar';
import Header from 'components_v3/Header/Header';

import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import ConfirmModal from 'components/modals/ConfirmStar/ComfirmModal';
import Button from 'components_v3/button/button';

// api
import withApis, { ApiComponentProps } from 'hoc/withApi';
import { getParcours, getFavorites, createFavorites } from 'requests';

// actions
import ParcoursActions from 'reducers/parcours';
import modalActions from 'reducers/modal';
// css
import TutoModal from 'components/modals/Tutomodal/tutoModal';
import tutoWrapper from 'hoc/tutoWrapper';
import classes from './profileContainer.module.scss';

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
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
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
    DispatchToProps {
  showTuto: (index: number) => boolean;
  tutoShowed: (index: number) => void;
}

const ProfileContainer = ({
  match,
  fetchingParcour,
  parcours,
  openModal,
  closeModal,
  history,
  showTuto,
  tutoShowed,
}: Props) => {
  useEffect(() => {
    if (showTuto(0)) {
      openModal(
        <TutoModal
          type="acceuil"
          click={() => {
            history.push('/game');
            closeModal();
          }}
          passer={() => {
            closeModal();
            tutoShowed(0);
          }}
        />,
      );
    }
  }, []);
  const expertiseRef = useRef(null);
  const [hoverSide, setHover] = useState(false);
  const oneCompetencesNoSetted = parcours.data.skills
    .filter(item => item.type === 'personal')
    .flatMap(item => item.competences.flat(2))
    .some(item => item.value === 5);

  if (match.isExact) return <Redirect to="/profile/skills" />;
  return (
    <Fragment>
      <Header HeaderProfile showLogout />

      <div
        className={classes.sidebar_container}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <SideBar isHovred={hoverSide} />
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
                      <Button
                        title="Aide"
                        color="darkblueFilled"
                        className={classes.footerBottons}
                      />
                    ),
                    key: 'help',
                  },
                  {
                    component: (
                      <Button title="Imprimer" color="blue" className={classes.footerBottons} />
                    ),
                    key: 'print',
                  },
                  {
                    component: (
                      <Button title="TÉLÉCHARGER" color="blue" className={classes.footerBottons} />
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
                title=" "
                type="personal"
                footerButtons={[
                  {
                    component: (
                      <Button
                        title="Aide"
                        color="darkblueFilled"
                        className={classes.footerBottons}
                      />
                    ),
                    key: 'help',
                  },
                ]}
              />
            )}
          />
          <Route
            path="/profile/pro"
            exact
            render={props =>
              (oneCompetencesNoSetted ? (
                <Redirect to="/profile/skills" />
              ) : (
                <ThemesContainer
                  title=" "
                  {...props}
                  type="professional"
                  footerButtons={[
                    {
                      component: (
                        <Button
                          title="Aide"
                          color="darkblueFilled"
                          className={classes.footerBottons}
                        />
                      ),
                      key: 'help',
                    },
                  ]}
                />
              ))
            }
          />
          <Route
            path="/profile/favoris"
            exact
            render={props =>
              (oneCompetencesNoSetted ? (
                <Redirect to="/profile/skills" />
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
                        <Button
                          title="voir mes métiers"
                          color="redFilled"
                          className={classes.footerBottons}
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
              (oneCompetencesNoSetted ? (
                <Redirect to="/profile/skills" />
              ) : (
                <JobsContainer
                  title="DÉCOUVRE ET AJOUTE LES MÉTIERS QUI T’INTÉRESSENT"
                  {...props}
                  footerButtons={[]}
                />
              ))
            }
          />
          <Route
            path="/profile/mesDemarches"
            exact
            render={props =>
              (oneCompetencesNoSetted ? <Redirect to="/profile/skills" /> : <MesDemarches />)
            }
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
  openModal: (children, backdropClassName) =>
    dispatch(modalActions.openModal({ children, backdropClassName })),
  closeModal: () => dispatch(modalActions.closeModal()),
});

export default tutoWrapper(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withApis({ getParcours, getFavorites, addFavorites: createFavorites })(ProfileContainer)),
);
