import React, { useState } from 'react';
import SelectCommune from 'components/form/Select/communeForm';
import Select from 'components/form/Select/select';
import Button from 'components_v3/button/button';

import { useSelectInput } from 'hooks';
import withApi, { ApiComponentProps } from 'hoc/withApi';
import { listCommunes, listEntreprise, ICommune } from 'requests';
import classes from './entreprise.module.scss';

type Props = ApiComponentProps<{ list: typeof listCommunes; get: typeof listEntreprise }>;

const EntrepriseForm = ({ list, get }: Props) => {
  const [
    communeValue,
    openCommune,
    onChangeCommune,
    onOpenCommune,
    onCloseCommune,
  ] = useSelectInput({} as ICommune);
  const [
    contratValue,
    openContrat,
    onChangeContrat,
    onOpenContrat,
    onCloseContrat,
  ] = useSelectInput('');
  const [distanceValue, setDistance] = useState(0);

  const onChangeValue = (event: any) => {
    const code = event.target.value;
    if (code.length >= 3) {
      list.call(code);
    }
  };
  const onChangeDistance = (event: any) => {
    const distancevalue = event.target.value;
    setDistance(distancevalue);
  };
  const searchJob = () => {
    const test = communeValue.coordonnees_gps.split(',');
    const latitude = Number(test[0]);
    const longitude = Number(test[1]);
    get.call({
      commune_id: communeValue.Code_commune_INSEE,
      contract: contratValue,
      latitude,
      longitude,
      distance: distanceValue,
      rome_codes: 'M1607',
    });
  };

  const { data } = list.data;
  return (
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
        <Button title="Recherche" onClick={searchJob} className={classes.btnRecherche} />
      </div>
    </div>
  );
};
export default withApi({ list: listCommunes, get: listEntreprise })(EntrepriseForm);
