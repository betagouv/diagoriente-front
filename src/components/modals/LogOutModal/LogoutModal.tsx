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
        <div className={classes.title_container}>
          <span>Attention, vous allez être déconnecté !</span>
        </div>

        <div className={classes.btn_container}>
          <Button onClick={logout} className={classes.btnOut}>
            Déconnecter{' '}
          </Button>
          <Button onClick={onClose} className={classes.btn}>
            Annuler{' '}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default LogoutModal;
