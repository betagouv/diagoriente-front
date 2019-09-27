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

const sideBarItemsExplorama = [
  {
    path: 'skills',
    title: 'CARTE DE COMPÉTENCES',
    icon: SvgCompetence,
    index: 0,
  },
  {
    path: 'favoris',
    title: 'EXPLORER MES INTÉRÊTS',
    icon: SvgInterests,
    index: 1,
  },
  {
    path: 'jobs',
    title: 'CHOISIR DES PISTES DE MÉTIERS',
    icon: SvgPistesMetiers,
    index: 2,
  },
  {
    path: 'demarche',
    title: 'MES DÉMARCHES',
    icon: SvgMesDemarches,
    index: 3,
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
interface currentProps {
  isHovred: boolean;
}
interface Props extends RouteComponentProps, currentProps, MapToProps, IDispatchToProps {}

const SideBar = ({
  match,
  location,
  parcours,
  history,
  closeModal,
  openModal,
  parcoursRequest,
  isHovred,
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
      <div className={classes.itemsExplorama}>
        {sideBarItemsExplorama.map((item, i) => {
          const selectedItem = sideBarItemsExplorama.find(
            side => `${match.path}/${side.path}` === location.pathname,
          );
          let condition = '';
          if (selectedItem) {
            condition = `${match.path}/${item.path}` === location.pathname
                ? '#fc1262'
                : selectedItem.index > i
                ? '#243D77'
                : '#b3b3b3';
          }

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
                  {`${match.path}/${item.path}` === location.pathname && !isHovred && (
                    <div className={classes.arrowPointer} />
                  )}
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
