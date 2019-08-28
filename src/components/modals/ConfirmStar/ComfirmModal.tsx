import React from 'react';
import Button from 'components/buttons/RoundButton/RoundButton';

import Grid from '../../ui/Grid/Grid';
import classes from './confirm.module.scss';

interface Props {
  onCloseModal: () => void;
  confirme: (value: number) => void;
  text?: string;
  isConfirm?: boolean;
  type?: string;
  value: number;
}
type IProps = Props;

const ConfirmModal = ({
 onCloseModal, confirme, text, isConfirm, type, value,
}: IProps) => {
  const onSubmit = () => {
    confirme(value);
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
                {text}
              </span>
            </Grid>

            {ConfirmModals ? (
              <Grid item xl={12} className={classes.container_button}>
                <Button onClick={onAnnule} className={classes.btn}>
                  Annuler
                </Button>
                <Button onClick={onSubmit} className={classes.btnOut}>
                Confirmer
                </Button>
              </Grid>
            ) : (
              <Grid item xl={12} className={classes.container_button}>
                <Button onClick={onSubmit} className={classes.btnOut}>
                  Ok
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
