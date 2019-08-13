import React from 'react';
import { connect } from 'react-redux';
// types
import { ReduxState, ApiReducer, IParcoursResponse } from 'reducers';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import MultiIcon from '../../icons/multiIcon/multiIcon';

import classes from './sideBar.module.scss';

const sideBarItems = [
  {
    path: 'skills',
    title: 'CARTE DE COMPÉTENCES',
  },
  {
    path: 'perso',
    title: 'EXPÉRIENCES PERSONNELLES',
  },
];
const sideBarItemsExplorama = [
  {
    path: 'favoris',
    title: 'EXPLORER MES INTÉRÊTS',
  },
  {
    path: 'jobs',
    title: 'CHOISIR DES PISTES DE MÉTIERS',
  },
  {
    path: 'demarche',
    title: 'MES DÉMARCHES',
  },
];

interface MapToProps {
  parcours: ApiReducer<IParcoursResponse>;
}
interface Props extends RouteComponentProps, MapToProps {}

const SideBar = ({
 match, location, parcours, history,
}: Props) => {
  const isAlloawed = parcours.data.skills.length;

  const onNavigate = (url: string) => {
    history.push(url);
  };

  return (
    <div className={classes.container_Bar}>
      {sideBarItems.map(item => (
        <div key={item.path} className={classes.item}>
          <MultiIcon
            type="edit"
            withText
            text={`${item.title}`}
            width="35"
            sideBar
            height="35"
            onClick={() => onNavigate(`${match.path}/${item.path}`)}
            textColor={`${match.path}/${item.path}` === location.pathname ? '#ffba27' : '#7992BF'}
            Iconcolor={`${match.path}/${item.path}` === location.pathname ? '#ffba27' : '#7992BF'}
          />
        </div>
      ))}
      <div className={classes.item}>
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
      </div>
      <div className={classes.itemsExplorama}>
        {sideBarItemsExplorama.map(item => (
          <div key={item.path} className={classes.item}>
            <MultiIcon
              type="edit"
              withText
              text={`${item.title}`}
              width="35"
              sideBar
              height="35"
              onClick={isAlloawed !== 0 ? () => onNavigate(`${match.path}/${item.path}`) : () => {}}
              textColor={
                isAlloawed !== 0
                  ? `${match.path}/${item.path}` === location.pathname
                    ? '#ffba27'
                    : '#7992BF'
                  : 'gray'
              }
              Iconcolor={
                isAlloawed !== 0
                  ? `${match.path}/${item.path}` === location.pathname
                    ? '#ffba27'
                    : '#7992BF'
                  : 'gray'
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = ({ parcours }: ReduxState): MapToProps => ({
  parcours,
});
export default connect(
  mapStateToProps,
  null,
)(withRouter(SideBar));
