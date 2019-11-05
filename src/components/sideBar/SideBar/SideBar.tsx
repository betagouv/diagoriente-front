import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { useDidMount } from 'hooks';
import { map } from 'lodash';

import { getListEnvironment, getNiveau, getAccessibility } from 'requests';
import withApis, { ApiComponentProps } from 'hoc/withApi';
import { ISecteur } from 'requests/jobs';

import arrow from 'assets_v3/icons/arrow/arrowFIlter.png';
import Button from 'components_v3/button/button';
import EntrepriseForm from 'components_v3/EntrepriseForm/EntrepriseForm';
import ImmersionModale from 'components_v3/ModalImmersion/ModalImmersion';
// style
import classNames from 'utils/classNames';
import classes from './sideBar.module.scss';

interface IProps {
  secteurs: ISecteur[];
  filterJobs: (
    filterArray: string[],
    secteurArray: string[],
    niveauArray: string[],
    accessibilityArray: string[],
  ) => void;
  parcoursId: string;
  other: boolean | null;
  onOtherChange: () => void;
	openModal: (children: JSX.Element, backdropClassName?: string | undefined) => void;
	closeModal: () => void;
}

interface Props
  extends IProps,
    ApiComponentProps<{
      get: typeof getListEnvironment;
      getListNiveau: typeof getNiveau;
      getListAccessibility: typeof getAccessibility;
    }> {}

const SideBar = ({
 get, secteurs, filterJobs, other, onOtherChange, closeModal,openModal,
  getListNiveau,
  getListAccessibility,
}: Props) => {
  useDidMount(() => {
    get.call();
    getListNiveau.call();
    getListAccessibility.call();
  });
  const [isFilterOpen, setFilterOpen] = useState(true);
  const [isSecteurOpen, setSecteurOpen] = useState(true);
  const [isNiveauOpen, setNiveauOpen] = useState(true);
  const [isAccessibilityOpen, setAccessibilityOpen] = useState(true);

  const [filterArray, setFilterArray] = useState([]);
  const [secteurArray, setSecteurArray] = useState([]);
  const [niveauArray, setNiveauArray] = useState([]);
  const [accessibilityArray, setAccessibilityArray] = useState([]);

  const setFilterToggle = () => {
    setFilterOpen(!isFilterOpen);
  };

  const setSecteurtoggle = () => {
    setSecteurOpen(!isSecteurOpen);
  };
  const setNiveauToggle = () => {
    setNiveauOpen(!isNiveauOpen);
  };

  const setAccessibilityToggle = () => {
    setAccessibilityOpen(!isAccessibilityOpen);
  };

  const onChange = (e: MouseEvent<any> | ChangeEvent<any>) => {
    e.stopPropagation();
    onOtherChange();
  };

  function getSelected<T>(
    array: T[],
    callback: (row: T, index: number, array: T[]) => boolean,
  ): { index: number; selected: boolean } {
    const index = array.findIndex(callback);
    const selected = index !== -1;
    return { index, selected };
  }
  return (
    <div className={classes.container_sideBar}>
      <Button
        title="Trouver mon immersion"
        color="red"
        onClick={() => {
          openModal(<ImmersionModale onCloseModal={closeModal} />);
        }}
        style={{ height: 50, margin: '10px auto' }}
      />
      <div className={classes.filter_container}>
        <div className={classes.selection_title} onClick={setFilterToggle}>
          <img
            src={arrow}
            alt="l"
            className={isFilterOpen ? classes.arrowRoteted : classes.arrow}
          />
          <div>FILTRES</div>
        </div>
        <div
          className={classNames(
            isFilterOpen ? classes.filter_containerOpen_child : classes.filter_container_child,
          )}
        >
          {map(get.data.data, item => {
            const { index, selected } = getSelected(filterArray, r => item._id === r);
            const onClick = (e: MouseEvent<any> | ChangeEvent<any>) => {
              e.stopPropagation();
              const nextFilters: any = [...filterArray];
              if (selected) {
                nextFilters.splice(index, 1);
                setFilterArray(nextFilters);
                filterJobs(nextFilters, secteurArray, niveauArray, accessibilityArray);
              } else {
                nextFilters.push(item._id);
                setFilterArray(nextFilters);
                filterJobs(nextFilters, secteurArray, niveauArray, accessibilityArray);
              }
            };
            return (
              <div key={item._id} className={classes.rowItem} onClick={onClick}>
                <input
                  type="checkbox"
                  checked={selected}
                  style={selected ? { background: '#ff0060', border: 'none' } : {}}
                  onChange={onClick}
                />
                <span className={classNames(selected ? classes.itemSelected : classes.item)}>
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.filter_container}>
        <div className={classes.selection_title} onClick={setSecteurtoggle}>
          <img
            src={arrow}
            alt="l"
            className={isSecteurOpen ? classes.arrowRoteted : classes.arrow}
          />

          <div>DOMAINES D’ACTIVITÉ</div>
        </div>
        <div
          className={classNames(
            isSecteurOpen ? classes.themes_containerOpen_child : classes.themes_container_child,
          )}
        >
          {map(secteurs, (item: any) => {
            const { index, selected } = getSelected(secteurArray, (r: any) => item._id === r);
            const nextFilters: any = [...secteurArray];
            const onClickSecteur = () => {
              if (selected) {
                nextFilters.splice(index, 1);
              } else {
                nextFilters.push(item._id);
              }
              setSecteurArray(nextFilters);
              filterJobs(filterArray, nextFilters, niveauArray, accessibilityArray);
            };
            return (
              <div key={item._id} className={classes.rowItem} onClick={onClickSecteur}>
                <input
                  type="checkbox"
                  checked={selected}
                  style={selected ? { background: '#ff0060', border: 'none' } : {}}
                />
                <span className={classNames(selected ? classes.itemSelected : classes.item)}>
                  {item.title}
                </span>
              </div>
            );
          })}
          {secteurs.length
            ? other !== null && (
            <div className={classes.rowItem} onClick={onChange}>
              <input
                type="checkbox"
                checked={other}
                style={other ? { background: '#ff0060', border: 'none' } : {}}
                onChange={onChange}
              />
              <span className={classNames(other ? classes.itemSelected : classes.item)}>
                {'Autre'}
              </span>
            </div>
              )
            : null}
        </div>
      </div>
 {/*      <div className={classes.filter_container}>
        <div className={classes.selection_title} onClick={setNiveauToggle}>
          <img
            src={arrow}
            alt="l"
            className={isNiveauOpen ? classes.arrowRoteted : classes.arrow}
          />

          <div>NIVEAU D'ACCES</div>
        </div>
        <div
          className={classNames(
            isNiveauOpen ? classes.niveau_containerOpen_child : classes.filter_container_child,
          )}
        >
          {map(getListNiveau.data, item => {
            const { index, selected } = getSelected(niveauArray, r => item === r);
            const onClick = (e: MouseEvent<any> | ChangeEvent<any>) => {
              e.stopPropagation();
              const nextFilters: any = [...niveauArray];
              if (selected) {
                nextFilters.splice(index, 1);
                setNiveauArray(nextFilters);
                filterJobs(filterArray, secteurArray, nextFilters, accessibilityArray);
              } else {
                nextFilters.push(item);
                setNiveauArray(nextFilters);
                filterJobs(filterArray, secteurArray, nextFilters, accessibilityArray);
              }
            };
            return (
              <div key={item} className={classes.rowItem} onClick={onClick}>
                <input
                  type="checkbox"
                  checked={selected}
                  style={selected ? { background: '#ff0060', border: 'none' } : {}}
                  onChange={onClick}
                />
                <span className={classNames(selected ? classes.itemSelected : classes.item)}>
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div> */}

      <div className={classes.filter_container}>
        <div className={classes.selection_title} onClick={setAccessibilityToggle}>
          <img
            src={arrow}
            alt="l"
            className={isAccessibilityOpen ? classes.arrowRoteted : classes.arrow}
          />
           <div>NIVEAU D'ACCES</div>
        </div>

        <div
          className={classNames(
            isAccessibilityOpen
              ? classes.niveau_containerOpen_child
              : classes.filter_container_child,
          )}
        >
          {map(getListAccessibility.data, (item: any) => {
            const { index, selected } = getSelected(accessibilityArray, r => item._id === r);
            const onClick = (e: MouseEvent<any> | ChangeEvent<any>) => {
              e.stopPropagation();
              const nextFilters: any = [...accessibilityArray];
              if (selected) {
                nextFilters.splice(index, 1);
                setAccessibilityArray(nextFilters);
                filterJobs(filterArray, secteurArray, niveauArray, nextFilters);
              } else {
                nextFilters.push(item._id);
                setAccessibilityArray(nextFilters);
                filterJobs(filterArray, secteurArray, niveauArray, nextFilters);
              }
            };
            return (
              <div key={item._id} className={classes.rowItem} onClick={onClick}>
                <input
                  type="checkbox"
                  checked={selected}
                  style={selected ? { background: '#ff0060', border: 'none' } : {}}
                  onChange={onClick}
                />
                <span className={classNames(selected ? classes.itemSelected : classes.item)}>
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

SideBar.defaultProps = {
  other: null,
  onOtherChange: () => {},
};

export default withApis({
  get: getListEnvironment,
  getListNiveau: getNiveau,
  getListAccessibility: getAccessibility,
})(SideBar);
