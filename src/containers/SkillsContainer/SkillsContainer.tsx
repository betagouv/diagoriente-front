import React, {
 Ref, forwardRef, Fragment, Dispatch, useEffect,
} from 'react';
import { connect } from 'react-redux';
import { find, isEmpty } from 'lodash';
import { RouteComponentProps } from 'react-router-dom';
import { AnyAction } from 'redux';
import {
 ReduxState, IParcoursResponse, IExpertise, IUser,
} from 'reducers';
import { useDidUpdate, useDidMount } from 'hooks';

import withLayout from 'hoc/withLayout';
import withApis, { ApiComponentProps } from 'hoc/withApi';

import { getParcours, IUpdateParcoursParams } from 'requests';

import ModalInvalid from 'components/modals/InvalidModal/InvalidModal';
import modalActions from 'reducers/modal';
import { useCaptureRef } from 'hooks/useCaptureRef';
import { beta1x } from 'assets/icons/logobeta/index';
// import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import logo from 'assets_v3/Home/logo.svg';
import ApparationCard from 'components_v3/ApparationCard';
import GraduationLevel from 'components_v3/GraduationLevel';
import parcoursActions from 'reducers/parcours';
import TutoModal from 'components/modals/Tutomodal/tutoModal';

import { pdf2 } from 'utils/pdf';
import tutoWrapper, { TutoFns } from 'hoc/tutoWrapper';
import Button from 'components_v3/button/button';
import classes from './skills.module.scss';

interface MapToProps {
  parcours: IParcoursResponse;
  expertises: IExpertise[];
  user: IUser | undefined;
}
interface IDispatchToProps {
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
  parcoursRequest: (args: IUpdateParcoursParams) => void;
}

interface Props
  extends RouteComponentProps,
    MapToProps,
    IDispatchToProps,
    ApiComponentProps<{ get: typeof getParcours }>,
    TutoFns {}

interface RefProp {
  onFooterClick(button: string): void;
}
const SkillsContainer = forwardRef(
  (
    {
      parcours,
      get,
      history,
      expertises,
      user,
      closeModal,
      openModal,
      parcoursRequest,
      tutoShowed,
    }: Props,
    ref: Ref<RefProp>,
  ) => {
    useDidMount(() => {
      get.call(parcours._id);
    });
    /*    useEffect(() => {
      if (get.data.globalCopmetences === {}) {
        get.call(parcours._id);
      }
    }); */
    /*     useDidUpdate(() => {
      if (!get.fetching) {
        get.call(parcours._id);
      }
    }, [get.fetching]); */
    async function onFooterClick(button: string) {
      if (!isEmpty(get.data) && !isEmpty(parcours)) {
        if (button === 'download') {
          pdf2(parcours, get, user);
        }
        if (button === 'print') {
          pdf2(parcours, get, user, true);
        }
        if (button === 'help') {
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
      }
    }

    useCaptureRef({ onFooterClick }, ref);

    function pushRoute(route: string, params?: string) {
      return function () {
        history.push({ pathname: route, state: { detail: params } });
      };
    }
    const onNavigate = () => {
      history.push('/game');
      parcoursRequest({ played: true });
      closeModal();
    };
    const onOpenModal = () => {
      openModal(
        <ModalInvalid
          text="Avant de commencer à renseigner tes expériences, nous te proposons un jeu rapide pour apprendre à identifier tes compétences"
          onCloseModal={closeModal}
          onClick={() => onNavigate()}
        />,
      );
    };
    return (
      <div className={classes.container}>
        <div className={classes.card}>
          <div className={classes.header}>
            <div className={classes.titleContainer}>
              <span className={classes.headerTitle}>Carte de Compétences</span>
              {user && (
                <span className={classes.userName}>
                  {`de ${user.profile.firstName} ${user.profile.lastName}`}
                </span>
              )}
            </div>
            <div className={classes.logoWrapper}>
              <img src={beta1x} alt="" />
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.left}>
              <div className={classes.item}>
                <span className={classes.experieceType}>EXPÉRIENCES PERSONNELLES</span>

                {parcours.skills.filter(type => type.theme.type === 'personal').length === 0 ? (
                  <div className={classes.emptyExperienceContainer}>
                    <div className={classes.textEmptyContainer}>
                      <span>Aucune expérience renseignée</span>
                    </div>
                    <div className={classes.emptyButton}>
                      <Button
                        title="ajouter"
                        color="red"
                        onClick={
                          parcours.played
                            ? pushRoute('/profile/perso', 'select_theme')
                            : () => onOpenModal()
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <Fragment>
                    <div className={classes.themesContainer}>
                      {parcours.skills
                        .filter(type => type.theme.type === 'personal')
                        .map(skill => (
                          <div className={classes.mapContainer} key={skill._id}>
                            <div className={classes.hr} />
                            <li>{skill.theme.title}</li>
                          </div>
                        ))}
                    </div>
                    <div className={classes.buttonWrapper}>
                      <Button
                        title="Modifier"
                        color="blue"
                        onClick={
                          parcours.played
                            ? pushRoute('/profile/perso', 'edit_all')
                            : () => onOpenModal()
                        }
                      />
                      <Button
                        title="ajouter"
                        color="red"
                        onClick={
                          parcours.played
                            ? pushRoute('/profile/perso', 'select_theme')
                            : () => onOpenModal()
                        }
                      />
                    </div>
                  </Fragment>
                )}
              </div>
              <div className={classes.item}>
                <span className={classes.experieceType}>EXPÉRIENCES PROFESSIONNELLES</span>

                {parcours.skills.filter(type => type.theme.type === 'professional').length === 0 ? (
                  <div className={classes.emptyExperienceContainer}>
                    <div className={classes.textEmptyContainer}>
                      <span>Aucune expérience renseignée</span>
                    </div>
                    <div className={classes.emptyButton}>
                      <Button
                        title="ajouter"
                        color="red"
                        onClick={pushRoute('/profile/pro', 'select_theme')}
                      />
                    </div>
                  </div>
                ) : (
                  <Fragment>
                    <div className={classes.themesContainer}>
                      {parcours.skills
                        .filter(type => type.theme.type === 'professional')
                        .map(skill => (
                          <div className={classes.mapContainer} key={skill._id}>
                            <div className={classes.hr} />
                            <li>{skill.theme.title}</li>
                          </div>
                        ))}
                    </div>
                    <div className={classes.buttonWrapper}>
                      <Button
                        title="Modifier"
                        color="blue"
                        onClick={
                          parcours.played
                            ? pushRoute('/profile/pro', 'edit_all')
                            : () => onOpenModal()
                        }
                      />
                      <Button
                        title="ajouter"
                        color="red"
                        onClick={pushRoute('/profile/pro', 'select_theme')}
                      />
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
            <div className={classes.right}>
              {expertises.map((expertise, index) => {
                const currentSkill = find(
                  get.data.globalCopmetences,
                  ({ _id }) => expertise._id === _id,
                );

                return (
                  <div key={expertise._id} className={classes.competences}>
                    <ApparationCard
                      title={expertise.title}
                      color={currentSkill && currentSkill.color}
                      className={classes.titleFont}
                    />
                    <GraduationLevel
                      level={currentSkill && currentSkill.value}
                      color={currentSkill && currentSkill.color}
                      index={1}
                      description={expertises[index].niveau}
                      modeShowOnly
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classes.footer}>
            <div className={classes.footerLogo}>
              <img className={classes.diag} src={logo} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

const mapStateToProps = ({ parcours, expertises, authUser }: ReduxState): MapToProps => ({
  parcours: parcours.data,
  expertises: expertises.data,
  user: authUser.user.user,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  parcoursRequest: args => dispatch(parcoursActions.parcoursRequest(args)),
  openModal: (children, backdropClassName) =>
    dispatch(modalActions.openModal({ children, backdropClassName })),
  closeModal: () => dispatch(modalActions.closeModal()),
});

export default tutoWrapper(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withApis({ get: getParcours })(withLayout(SkillsContainer))),
);
