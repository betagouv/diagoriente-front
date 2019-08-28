import React, { useState } from 'react';
import { useDidMount } from 'hooks';
import { map } from 'lodash';

import { getListEnvironment } from 'requests';
import withApis, { ApiComponentProps } from 'hoc/withApi';
import { ISecteur } from 'requests/jobs';

import arrow from 'assets_v3/icons/arrow/arrowFIlter.png';

// style
import classNames from 'utils/classNames';
import classes from './sideBar.module.scss';

interface IProps {
  secteurs: ISecteur[];
  filterJobs: (filterArray: string[], secteurArray: string[]) => void;
  parcoursId: string;
}

interface Props extends IProps, ApiComponentProps<{ get: typeof getListEnvironment }> {}

const SideBar = ({ get, secteurs, filterJobs }: Props) => {
  useDidMount(() => {
    get.call();
  });
  const [isFilterOpen, setFilterOpen] = useState(true);
  const [isSecteurOpen, setSecteurOpen] = useState(true);
  const [filterArray, setFilterArray] = useState([]);
  const [secteurArray, setSecteurArray] = useState([]);

  const setFilterToggle = () => {
    setFilterOpen(!isFilterOpen);
  };

  const setSecteurtoggle = () => {
    setSecteurOpen(!isSecteurOpen);
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
            const { index, selected } = getSelected(
              get.data.data,
              () => !!filterArray.find(r => item._id === r),
            );
            const onClick = () => {
              const nextFilters: any = [...filterArray];
              if (selected) {
                nextFilters.splice(index - 1, 1);
                setFilterArray(nextFilters);
                filterJobs(nextFilters, secteurArray);
              } else {
                nextFilters.push(item._id);
                setFilterArray(nextFilters);
                filterJobs(nextFilters, secteurArray);
              }
            };
            return (
              <div key={item._id} className={classes.rowItem} onClick={onClick}>
                <input type="checkbox" checked={selected} />
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
            const { index, selected } = getSelected(
              secteurs,
              () => !!secteurArray.find(r => item._id === r),
            );
            const onClickSecteur = () => {
              const nextFilters: any = [...secteurArray];
              if (selected) {
                nextFilters.splice(index - 1, 1);
                setSecteurArray(nextFilters);
                filterJobs(filterArray, nextFilters);
              } else {
                nextFilters.push(item._id);
                setSecteurArray(nextFilters);
                filterJobs(filterArray, nextFilters);
              }
            };
            return (
              <div key={item._id} className={classes.rowItem} onClick={onClickSecteur}>
                <input type="checkbox" checked={selected} />
                <span className={classNames(selected ? classes.itemSelected : classes.item)}>
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default withApis({ get: getListEnvironment })(SideBar);
