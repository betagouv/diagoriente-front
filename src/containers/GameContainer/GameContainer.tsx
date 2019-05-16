import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Header from '../../layout/Header/Header';
import classes from './game.module.scss';
import Grid from '../../components/ui/Grid/Grid';

import cancel from '../../assets/icons/svg/cancel.svg';

const GameContainer = ({ history }: RouteComponentProps) => {
  const onClick = () => {
    history.goBack();
  };

  return (
    <>
      <Header showLogout={false} />
      <div className={classes.frame_container}>
        <div className={classes.frame_overlay_container}>
          <iframe className={classes.frame} frameBorder="0" src="http://cccp-dev.cblue.be/CookingFever/index1.html" />
          <button onClick={onClick} className={classes.quit}>
            <img src={cancel} className={classes.cancel} />
          </button>
        </div>
      </div>
    </>
  );
};
export default GameContainer;
