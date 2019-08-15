import React from 'react';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';

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
          <MultiIcon
            type="remove"
            withText
            text="retour"
            width="36"
            height="36"
            withBorder
            style={{ padding: 0 }}
            onClick={onClose}
          />
          <MultiIcon
            type="validate"
            withText
            text="Déconnecter"
            width="36"
            height="36"
            withBorder
            Iconcolor="#ff001f"
            textColor="#ff001f"
            style={{ padding: 0 }}
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
};
export default LogoutModal;
