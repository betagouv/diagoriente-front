import React from 'react';
import Grid from '../../ui/Grid/Grid';
import Button from '../../buttons/RoundButton/RoundButton';
import classes from './logout.module.scss';

interface IProps {
  onLogout: () => void;
  onClose: () => void;
}

const LogoutModal = ({ onLogout, onClose }: IProps) => {
  const logout = () => {
    onLogout();
    onClose();
  };
  return (
    <div className={classes.wrapperModal}>
      <div className={classes.container}>
        <Grid container xl={12}>
          <Grid item xl={12}>
            <div className={classes.title_container}>
              <h3>Attention, vous êtes sur le point d’être déconnecté !</h3>
            </div>
          </Grid>
          <Grid item xl={12}>
            <div className={classes.btn_container}>
              <Button onClick={logout} className={classes.btn}>
                Déconnecter{' '}
              </Button>
              <Button onClick={onClose} className={classes.btn}>
                Annuler{' '}
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default LogoutModal;
