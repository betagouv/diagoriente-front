import React from 'react';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';

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
                <MultiIcon
                  type="remove"
                  withText
                  text="Annuler"
                  width="37"
                  height="37"
                  withBorder
                  style={{ padding: 0 }}
                  onClick={onCloseModal}
                />
                <MultiIcon
                  type="validate"
                  withText
                  text="Confirmer"
                  width="37"
                  height="37"
                  withBorder
                  Iconcolor="#ff001f"
                  textColor="#ff001f"
                  style={{ padding: 0 }}
                  onClick={onSubmit}
                />
              </Grid>
            ) : (
              <Grid item xl={12} className={classes.container_button}>
                <MultiIcon
                  type="validate"
                  withText
                  text="Ok"
                  width="37"
                  height="37"
                  withBorder
                  Iconcolor="#ff001f"
                  textColor="#ff001f"
                  style={{ padding: 0 }}
                  onClick={onSubmit}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default ConfirmModal;
