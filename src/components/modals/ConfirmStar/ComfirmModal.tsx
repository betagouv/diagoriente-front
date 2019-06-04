import React, { MouseEvent, useEffect } from 'react';
import Grid from '../../ui/Grid/Grid';

import Button from '../../buttons/RoundButton/RoundButton';

import classes from './confirm.module.scss';

interface Props {
  onCloseModal: () => void;
  confirme: () => void;
}
type IProps = Props;

const ConfirmModal = ({ onCloseModal, confirme }: IProps) => {
  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    confirme();
    onCloseModal();
  };
  const onAnnule = (e: MouseEvent<HTMLButtonElement>) => {
    onCloseModal();
  };
  return (
    <div className={classes.wrapperModal}>
      <div className={classes.container}>
        <Grid container padding={{ xl: 0 }} spacing={{ xl: 0 }}>
          <Grid container padding={{ xl: 30 }} spacing={{ xl: 0 }}>
            <Grid item xl={12}>
              <div className={classes.title} />
            </Grid>
            <Grid item xl={12}>
              <span className={classes.title}>Niveau max de la compétence, confirme ou réévalue </span>
            </Grid>

            <Grid item xl={12} className={classes.container_button}>
              <Button onClick={onSubmit} className={classes.blue_btn}>Confirmer</Button>
              <Button onClick={onAnnule} className={classes.rose_btn}>Annuler</Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default ConfirmModal;
