import React from 'react';
import SelectCommune from 'components/form/Select/communeForm';
import Select from 'components/form/Select/select';
import Button from 'components_v3/button/button';
import { ICommune } from 'requests';

import classes from './entreprise.module.scss';

type Props = {
  openCommune: boolean;
  onChangeCommune: (value: ICommune) => void;
  communeValue: ICommune;
  onOpenCommune: () => void;
  onCloseCommune: () => void;
  onChangeValue: (event: any) => void;
  openContrat: boolean;
  contratValue: string;
  onChangeContrat: (event: any) => void;
  onOpenContrat: () => void;
  onCloseContrat: () => void;
  distanceValue: any;
  onChangeDistance: (event: any) => void;
  searchJob: () => void;
  data: any;
  isAllowed: boolean;
};

const EntrepriseForm = ({
  openCommune,
  onChangeCommune,
  communeValue,
  onOpenCommune,
  onCloseCommune,
  onChangeValue,
  openContrat,
  contratValue,
  onChangeContrat,
  onOpenContrat,
  onCloseContrat,
  distanceValue,
  onChangeDistance,
  searchJob,
  data,
  isAllowed,
}: Props) => (
  <div className={classes.container}>
    <SelectCommune
      options={data}
      open={openCommune}
      onChange={onChangeCommune}
      value={communeValue}
      className={classes.container_input_select}
      placeholder="liste commues code "
      selectOpen={onOpenCommune}
      selectClose={onCloseCommune}
      onChangeValue={onChangeValue}
    />
    <div className={classes.inputContrat}>
      <Select
        options={[
          {
            value: 'dpae',
            label: 'dpae',
          },
          {
            value: 'alternance',
            label: 'alternance',
          },
        ]}
        open={openContrat}
        onChange={onChangeContrat}
        value={contratValue}
        className={classes.container_input_select}
        placeholder="Type de contrat"
        selectOpen={onOpenContrat}
        selectClose={onCloseContrat}
      />
    </div>
    <div className={classes.inputContainer}>
      <input
        type="text"
        value={distanceValue}
        onChange={onChangeDistance}
        placeholder="distance"
        className={classes.inputDistance}
      />
    </div>
    <div className={classes.btnCOntainer}>
      {isAllowed ? (
        <Button title="Recherche" onClick={searchJob} className={classes.btnRecherche} />
      ) : (
        <Button title="Recherche" className={classes.btnRechercheDisabled} />
      )}
    </div>
  </div>
);
export default EntrepriseForm;
