import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

// types
import { ReduxState, ApiReducer, IParcoursResponse } from 'reducers';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
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
  {
    path: 'pro',
    title: 'EXPÉRIENCES PROFESSIONNELLES',
  },
];
const sideBarItemsExplorama = [
  {
    path: 'interest',
    title: 'EXPLORER MES INTÉRÊTS',
    explorama: true,
  },
  {
    path: 'jobs',
    title: 'CHOISIR DES PISTES DE MÉTIERS',
    explorama: true,
  },
  {
    path: 'demarche',
    title: 'MES DÉMARCHES',
    explorama: true,
  },
];

interface MapToProps {
  parcours: ApiReducer<IParcoursResponse>;
}
interface Props extends RouteComponentProps, MapToProps {}

const SideBar = ({ match, location, parcours }: Props) => {
  const isAlloawed = parcours.data.skills.length;
  return (
    <div className={classes.container_Bar}>
      {sideBarItems.map(item => {
        return (
          <div key={item.path} className={classes.item}>
            <Link to={`${match.path}/${item.path}`}>
              <MultiIcon
                type="edit"
                withText
                text={`${item.title}`}
                width="35"
                sideBar
                height="35"
                textColor={`${match.path}/${item.path}` === location.pathname ? '#ffba27' : '#7992BF'}
                Iconcolor={`${match.path}/${item.path}` === location.pathname ? '#ffba27' : '#7992BF'}
              />
            </Link>
          </div>
        );
      })}
      <div className={classes.itemsExplorama}>
        {sideBarItemsExplorama.map(item => {
          return (
            <div key={item.path} className={classes.item}>
              <Link to={`${match.path}/${item.path}`}>
                <MultiIcon
                  type="edit"
                  withText
                  text={`${item.title}`}
                  width="35"
                  sideBar
                  height="35"
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
              </Link>
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
export default connect(
  mapStateToProps,
  null,
)(withRouter(SideBar));
