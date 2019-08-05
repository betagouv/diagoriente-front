import React from 'react';

import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import classes from './sideBar.module.scss';

const sideBarItems = [
  {
    path: 'skills',
    title: 'carte de compétences',
  },
  {
    path: 'perso',
    title: 'expérience personnelles',
  },
  {
    path: 'pro',
    title: 'expérience professionnelle',
  },
];

interface Props extends RouteComponentProps {}

const SideBar = ({ match }: Props) => {
  return (
    <div>
      {sideBarItems.map(item => {
        return (
          <div key={item.path} className={classes.item}>
            <Link to={`${match.path}/${item.path}`}>
              <span>{item.title}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default withRouter(SideBar);
