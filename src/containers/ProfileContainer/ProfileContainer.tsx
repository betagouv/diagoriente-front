import React from 'react';

import Grid from '../../components/ui/Grid/Grid';
import Info from '../../components/ui/Info/Info';
import StepCard from '../../components/cards/StepCard/StepCard';

import classes from './profileContainer.module.scss';

const ProfileContainer = () => {
  return (
    <div className={classes.container}>
      <Grid container className={'flex_center'}>
        <Grid item xl={12} className={classes.title}>
          Bienvenue sur Diagoriente
        </Grid>
      </Grid>
      <Info>Complète les différentes rubriques pour enrichir ton profil de compétences</Info>
      <Grid className={classes.steps_container} container>
        <Grid item xl={8}>
          <Grid padding={{ xl: 0 }} container>
            <Grid item xl={6}>
              <StepCard />
            </Grid>
            <Grid item xl={6}>
              <StepCard />
            </Grid>
            <Grid item xl={6}>
              <StepCard />
            </Grid>
            <Grid item xl={6}>
              <StepCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={4} />
      </Grid>
    </div>
  );
};

export default ProfileContainer;
