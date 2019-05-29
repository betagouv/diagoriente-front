import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Header from '../../layout/Header/Header';
import classes from './game.module.scss';
import Button from '../../components/buttons/ContinueButtom/ContinueButton';

import cancel from '../../assets/icons/svg/cancel.svg';

const GameContainer = ({ history }: RouteComponentProps) => {
  const onClick = () => {
    history.goBack();
  };
  const onNavigate = () => {
    history.push('/profile');
  };

  return (
    <>
      <Header showLogout={false} pathTo="/profile" />
      <div className={classes.frame_container}>
        <div className={classes.frame_overlay_container}>
          <iframe className={classes.frame} frameBorder="0" src="https://monbilansnu.beta.gouv.fr/game-diagoriente/" />
        </div>
      </div>
      <div className={classes.btn_container}>
        <Button onClick={onNavigate} label="passer à la suite" />
      </div>
    </>
  );
};
export default GameContainer;
