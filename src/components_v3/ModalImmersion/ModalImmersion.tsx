import React from 'react';

import EntrepriseForm from 'components_v3/EntrepriseForm/EntrepriseForm';

import Button from 'components_v3/button/button';

import classes from './ModalImmersion.module.scss';

type responseProps = {
  questionJobId: string;
  response: boolean;
};

interface MyProps {
  onCloseModal: () => void;
}

const ImmersionModal = ({ onCloseModal }: MyProps) => (
  <div className={classes.wrapperModal}>
    <Button title="x" color="red" onClick={onCloseModal} className={classes.exit} />
    <EntrepriseForm title="modale" />
  </div>
);
export default ImmersionModal;
