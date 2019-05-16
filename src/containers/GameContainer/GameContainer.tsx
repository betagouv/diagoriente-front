import React from 'react';
import Header from '../../layout/Header/Header';
import classes from './game.module.scss';
import Grid from '../../components/ui/Grid/Grid';

const GameContainer = () => {
  const onClick = () => {
    history.back();
  };

  return (
    <div className={classes.gameContainer}>
      <Header />
      <div className={classes.buttonContainer}>
        <button className={classes.button} onClick={onClick}>quitter</button>
      </div>
      <Grid item xl={12}>
      <iframe id={classes.frame} frameBorder="0" src="http://cccp-dev.cblue.be/CookingFever/index1.html" />
      </Grid>
    </div>
  );
};
export default GameContainer;
