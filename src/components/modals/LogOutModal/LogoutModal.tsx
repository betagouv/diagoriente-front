import React from 'react';
import Button from 'components_v3/button/button';

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
          <Button onClick={logout} className={classes.btnOut} title="Déconnecter" color="blue" />
          <Button onClick={onClose} className={classes.btn} title="Annuler" color="blue" />
        </div>
      </div>
    </div>
  );
};
export default LogoutModal;
