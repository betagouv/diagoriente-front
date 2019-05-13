import React from 'react';

import Grid from '../Grid/Grid';

import classes from './complete.module.scss';
import Button from '../../buttons/RoundButton/RoundButton';

const CompleteProfile = () => {
  return (
    <div className={classes.container}>
      <Grid container xl={12} spacing={{ xl: 10 }} padding={{ xl: 80, md: 30, sm: 15 }}>
        <Grid item xl={4} md={6} className={classes.margin}>
          <div className={classes.box_1} />
        </Grid>
        <Grid item xl={4} md={6} className={classes.margin}>
          <div className={classes.box_1} />
        </Grid>
        <Grid item xl={4} md={6} className={classes.margin}>
          <div className={classes.box_1} />
        </Grid>

        <Grid item xl={4} md={6} className={classes.margin}>
          <div className={classes.box_1} />
        </Grid>
        <Grid item xl={4} md={6} className={classes.margin}>
          <div className={classes.box_1} />
        </Grid>
        <Grid item xl={4} md={6} className={classes.margin}>
          <div className={classes.box_1} />
        </Grid>
      </Grid>
      <div className={classes.modal}>
        <div className={classes.content}>
          <div className={classes.circle} />
          <div className={classes.img_container}>
            <img alt="logo" />
          </div>
          <div className={classes.text_container}>
            <span className={classes.text}>Nous n’avons pas encore assez d’informations. </span>
            <span className={classes.text}>Complète ton profil ci-dessus et reviens voir !</span>
          </div>
          <div className={classes.container_button}>
            <Button>Compléter mon profil</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompleteProfile;
