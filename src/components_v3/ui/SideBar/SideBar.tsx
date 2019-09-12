import React, { Dispatch, Fragment } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';

// types
import { ReduxState, ApiReducer, IParcoursResponse } from 'reducers';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ModalInvalid from 'components/modals/InvalidModal/InvalidModal';
import modalActions from 'reducers/modal';
import parcoursActions from 'reducers/parcours';
import { IUpdateParcoursParams } from 'requests';
import SvgCompetence from 'assets_v3/Sidebar/compétences';
import SvgMesDemarches from 'assets_v3/Sidebar/MesDemarches';
import SvgInterests from 'assets_v3/Sidebar/MesInterets';
import SvgPistesMetiers from 'assets_v3/Sidebar/PistesMetiers';
import MultiIcon from '../../icons/multiIcon/multiIcon';

import classes from './sideBar.module.scss';

const sideBarItems = [
  {
    path: 'skills',
    title: 'CARTE DE COMPÉTENCES',
    icon: SvgCompetence,
  },
  /* {
    path: 'perso',
    title: 'EXPÉRIENCES PERSONNELLES',
  }, */
];
const sideBarItemsExplorama = [
  {
    path: 'favoris',
    title: 'EXPLORER MES INTÉRÊTS',
    icon: SvgInterests,
  },
  {
    path: 'jobs',
    title: 'CHOISIR DES PISTES DE MÉTIERS',
    icon: SvgPistesMetiers,
  },
  {
    path: 'demarche',
    title: 'MES DÉMARCHES',
    icon: SvgMesDemarches,
  },
];

interface MapToProps {
  parcours: ApiReducer<IParcoursResponse>;
}
interface IDispatchToProps {
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
  parcoursRequest: (args: IUpdateParcoursParams) => void;
}
interface Props extends RouteComponentProps, MapToProps, IDispatchToProps {}

const SideBar = ({
  match,
  location,
  parcours,
  history,
  closeModal,
  openModal,
  parcoursRequest,
}: Props) => {
  const isAlloawed = parcours.data.skills.length;

  const onNavigate = (url: string) => {
    history.push(url);
  };
  const navigate = () => {
    history.push('/game');
    parcoursRequest({ played: true });
    closeModal();
  };
  const onOpenModal = () => {
    openModal(
      <ModalInvalid
        text="Avant de commencer à renseigner tes expériences, nous te proposons un jeu rapide pour apprendre à identifier tes compétences"
        onCloseModal={closeModal}
        onClick={() => navigate()}
      />,
    );
  };
  return (
    <div className={classes.container_Bar}>
      {sideBarItems.map(item => (
        <div
          key={item.path}
          className={classes.item}
          onClick={
            parcours.data.played
              ? () => onNavigate(`${match.path}/${item.path}`)
              : () => onOpenModal()
          }
        >
          <div className={classes.iconContainer}>
            <SvgCompetence
              color={`${match.path}/${item.path}` === location.pathname ? '#ffba27' : '#7992BF'}
            />
          </div>
          <div className={classes.titleContainer}>
            <span
              className={classes.title}
              style={{
                color: `${match.path}/${item.path}` === location.pathname ? '#ffba27' : '#7992BF',
              }}
            >
              {item.title}
            </span>
          </div>
        </div>
      ))}
      {/* <div className={classes.item}>
        <MultiIcon
          type="edit"
          withText
          text="EXPÉRIENCES PROFESSIONNELLES"
          width="35"
          sideBar
          height="35"
          onClick={isAlloawed !== 0 ? () => onNavigate(`${match.path}/pro`) : () => {}}
          textColor={
            isAlloawed !== 0
              ? location.pathname === `${match.path}/pro`
                ? '#ffba27'
                : '#7992BF'
              : 'gray'
          }
          Iconcolor={
            isAlloawed !== 0
              ? location.pathname === `${match.path}/pro`
                ? '#ffba27'
                : '#7992BF'
              : 'gray'
          }
        />
      </div> */}
      <div className={classes.itemsExplorama}>
        {sideBarItemsExplorama.map((item, i) => {
          const condition = `${match.path}/${item.path}` === location.pathname ? '#ffba27' : '#7992BF';

          return (
            <div
              key={item.path}
              className={classes.item}
              onClick={isAlloawed !== 0 ? () => onNavigate(`${match.path}/${item.path}`) : () => {}}
            >
              {i === sideBarItemsExplorama.length - 1 ? (
                <Fragment>
                  <div
                    className={classes.iconContainer}
                    /*      onClick={
                    parcours.data.played
                      ? () => onNavigate(`${match.path}/${item.path}`)
                      : () => onOpenModal()
                  } */
                  >
                    <SvgMesDemarches
                      color={`${match.path}/${item.path}` === location.pathname ? '#666' : '#666'}
                    />
                  </div>
                  <div className={classes.titleContainer}>
                    <span
                      className={classes.title}
                      style={{
                        color: `${match.path}/${item.path}` === location.pathname ? '#666' : '#666',
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className={classes.iconContainer}>
                    <item.icon color={isAlloawed !== 0 ? condition : 'gray'} />
                  </div>
                  <div className={classes.titleContainer}>
                    <span
                      className={classes.title}
                      style={{
                        color: isAlloawed !== 0 ? condition : 'gray',
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                </Fragment>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = ({ parcours }: ReduxState): MapToProps => ({
  parcours,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  parcoursRequest: args => dispatch(parcoursActions.parcoursRequest(args)),
  openModal: (children, backdropClassName) =>
    dispatch(modalActions.openModal({ children, backdropClassName })),
  closeModal: () => dispatch(modalActions.closeModal()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SideBar));
