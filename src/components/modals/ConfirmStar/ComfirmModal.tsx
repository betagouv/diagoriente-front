import React from 'react';
import Grid from '../../ui/Grid/Grid';

import Button from '../../buttons/RoundButton/RoundButton';

import classes from './confirm.module.scss';

interface Props {
  onCloseModal: () => void;
  confirme: () => void;
  text?: string;
  isConfirm?: boolean;
  type?: string;
}
type IProps = Props;

const ConfirmModal = ({
 onCloseModal, confirme, text, isConfirm, type,
}: IProps) => {
  const onSubmit = () => {
    confirme();
    onCloseModal();
  };
  const onAnnule = () => {
    onCloseModal();
  };

  const ConfirmModals = isConfirm !== undefined ? isConfirm : true;
  return (
    <div className={classes.wrapperModal}>
      <div className={classes.container}>
        <Grid container padding={{ xl: 0 }} spacing={{ xl: 0 }}>
          <Grid container padding={{ xl: 30 }} spacing={{ xl: 0 }}>
            <Grid item xl={12}>
              <div className={classes.title} />
            </Grid>
            <Grid item xl={12}>
              <span className={type === 'professional' ? classes.title_pro : classes.title}>
                {text || 'Niveau max de la compétence, confirme ou réévalue'}
              </span>
            </Grid>

            {ConfirmModals ? (
              <Grid item xl={12} className={classes.container_button}>
                <Button
                  onClick={onSubmit}
                  className={type === 'professional' ? classes.orangeBtn : classes.red_btn}
                >
                  Confirmer
                </Button>
                <Button onClick={onAnnule} className={classes.rose_btn}>
                  Annuler
                </Button>
              </Grid>
            ) : (
              <Grid item xl={12} className={classes.container_button}>
                <Button
                  onClick={onAnnule}
                  className={type === 'professional' ? classes.orangeBtn : classes.red_btn}
                >
                  OK
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default ConfirmModal;
