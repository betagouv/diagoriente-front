import React, { useState, Fragment } from 'react';
import SelectCommune from 'components/form/Select/communeForm';
import Select from 'components/form/Select/select';
import Button from 'components_v3/button/button';
import { ICommune, listCommunes, listEntreprise } from 'requests';
import Spinner from 'components_v3/ui/Spinner/Spinner';
import classNames from 'utils/classNames';
import { isEmpty } from 'lodash';
import withApi, { ApiComponentProps } from 'hoc/withApi';
import { useSelectInput } from 'hooks';
import arrow from 'assets_v3/icons/arrow/arrowFIlter.png';

import classes from './entreprise.module.scss';

interface Iprops {
  title: string;
}

type Props = Iprops & ApiComponentProps<{ list: typeof listCommunes; get: typeof listEntreprise }>;

const EntrepriseForm = ({ list, get, title }: Props) => {
  const [isSelectionOpen, setSelectionOpen] = useState(true);
  const setSelectionToggle = () => {
    setSelectionOpen(!isSelectionOpen);
  };
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
  const [distanceValue, setDistance] = useState(10);

  const onChangeValue = (event: any) => {
    const code = event.target.value;
    if (code.length >= 3) {
      list.call({ search: code });
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
      rome_codes_keyword_search: title,
    });
  };
  const { data } = list.data;
  const listEntreprises = get.data;
  const isAllowed = !isEmpty(communeValue) && distanceValue !== null && contratValue !== '';
  return (
    <Fragment>
      <div className={classes.selections}>
        <div className={classes.selection_title} onClick={setSelectionToggle}>
          <div className={classes.arrowContainer}>
            <img
              src={arrow}
              alt="l"
              className={isSelectionOpen ? classes.arrowRoteted : classes.arrow}
            />
          </div>

          <div>Filters</div>
        </div>
        <div
          className={classNames(
            isSelectionOpen ? classes.filter_containerOpen_child : classes.filter_container_child,
          )}
        >
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
        </div>
      </div>
      <div className={classes.containerEntrepriseList}>
        <div className={classes.entrepriseList}>
          {!get.fetching ? (
            !isEmpty(listEntreprises)
            && listEntreprises.map((entreprise: any) => (
              <div key={entreprise.siret} className={classes.entreproseDetail}>
                <div>
                  name:
                  {entreprise.name}
                </div>
                <div>
                  address:
                  {entreprise.address}
                </div>
              </div>
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default withApi({ list: listCommunes, get: listEntreprise })(EntrepriseForm);
