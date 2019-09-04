import React, { useState, forwardRef } from 'react';
import { useSelectInput } from 'hooks';
import withLayout from 'hoc/withLayout';
import arrow from 'assets_v3/icons/arrow/arrowFIlter.png';
import EntrepriseForm from 'components_v3/EntrepriseForm/EntrepriseForm';
import classNames from 'utils/classNames';
import withApi, { ApiComponentProps } from 'hoc/withApi';
import { listCommunes, listEntreprise, ICommune } from 'requests';
import { isEmpty } from 'lodash';
import Spinner from 'components_v3/ui/Spinner/Spinner';
import classes from './mesdemarches.module.scss';

type Props = ApiComponentProps<{ list: typeof listCommunes; get: typeof listEntreprise }>;

const MesDemarches = forwardRef(({ list, get }: Props) => {
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
  const [distanceValue, setDistance] = useState(null);

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
  const listEntreprises = get.data;
  const isAllowed = !isEmpty(communeValue) && distanceValue !== null && contratValue !== '';
  return (
    <div>
      <div className={classes.selections}>
        <div className={classes.selection_title} onClick={setSelectionToggle}>
          <img
            src={arrow}
            alt="l"
            className={isSelectionOpen ? classes.arrowRoteted : classes.arrow}
          />

          <div>Filters</div>
        </div>
        <div
          className={classNames(
            isSelectionOpen ? classes.filter_containerOpen_child : classes.filter_container_child,
          )}
        >
          <EntrepriseForm
            openCommune={openCommune}
            onChangeCommune={onChangeCommune}
            onOpenCommune={onOpenCommune}
            onCloseCommune={onCloseCommune}
            communeValue={communeValue}
            openContrat={openContrat}
            onChangeContrat={onChangeContrat}
            onOpenContrat={onOpenContrat}
            onCloseContrat={onCloseContrat}
            contratValue={contratValue}
            onChangeValue={onChangeValue}
            onChangeDistance={onChangeDistance}
            distanceValue={distanceValue}
            searchJob={searchJob}
            data={data}
            isAllowed={isAllowed}
          />
        </div>
      </div>
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
  );
});
export default withApi({ list: listCommunes, get: listEntreprise })(withLayout(MesDemarches));
