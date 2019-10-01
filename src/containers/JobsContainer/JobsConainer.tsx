import React, {
 Dispatch, useEffect, useState, useRef, useCallback,
} from 'react';
import { connect } from 'react-redux';
import {
 uniqBy, filter, map, isEmpty, differenceBy,
} from 'lodash';
import { RouteComponentProps } from 'react-router-dom';
import modalActions from 'reducers/modal';
import { AnyAction } from 'redux';

import { ReduxState } from 'reducers';
import withLayout from 'hoc/withLayout';
import arrow from 'assets_v3/icons/arrow/arrowFIlter.png';
import classNames from 'utils/classNames';
import JobSelection from 'components_v3/jobSelection/jobSelction';
import JobCard from 'components_v3/jobCard/jobCard';
import JobModal from 'components/modals/jobModal/jobModal';
import DeleteModal from 'components/modals/DeleteModal/DeleteTheme';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import Button from 'components_v3/button/button';
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import {
  getMyJob,
  createFavorites,
  getParcours,
  getFavorites,
  IJob,
  getSecteurs,
  ISecteur,
  deleteFavorites,
} from '../../requests';

import { useDidMount, useDidUpdate } from '../../hooks';
import Spinner from '../../components/ui/Spinner/Spinner';
import classes from './jobsContainer.module.scss';
import SideBar from '../../components/sideBar/SideBar/SideBar';

interface IMapToProps {
  parcoursId: string;
  families: string[];
  fetchingParcours: boolean;
}
interface IDispatchToProps {
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
}

interface Props
  extends ApiComponentProps<{
      listJobs: typeof getMyJob;
      addFavorites: typeof createFavorites;
      getParcours: typeof getParcours;
      deleteFavorites: typeof deleteFavorites;
      getSecteurs: typeof getSecteurs;
      getFav: typeof getFavorites;
    }>,
    IDispatchToProps,
    IMapToProps {}

const JobsContainer = ({
  listJobs,
  parcoursId,
  addFavorites,
  getParcours,
  getSecteurs,
  families,
  history,
  deleteFavorites,
  getFav,
  openModal,
  closeModal,
  fetchingParcours,
}: Props & RouteComponentProps) => {
  const [fetching, fetchingChange] = useState(false);
  const [selectedSecteurs, selectedSecteursChange] = useState([] as string[]);
  const jobsListRef = useRef<IJob[]>([]);

  const [isSelectionOpen, setSelectionOpen] = useState(true);
  const [isRecommandedOpen, setRecommandedOpen] = useState(true);
  const [isOtherOpen, setOtherOpen] = useState(true);
  const [other, setOther] = useState(false);
  const otherJobsRef = useRef<IJob[]>([]);
  const secteursRef = useRef<string[]>([]);
  const filtersRef = useRef<string[]>([]);

  const setSelectionToggle = () => {
    setSelectionOpen(!isSelectionOpen);
  };

  const setRecommandedtoggle = () => {
    setRecommandedOpen(!isRecommandedOpen);
  };
  const setOthertoggle = () => {
    setOtherOpen(!isOtherOpen);
  };

  useDidMount(() => {
    getParcours.call(parcoursId);
    getSecteurs.call();
    getFav.call();
  });
  useEffect(() => {
    if (!addFavorites.fetching && !addFavorites.error) {
      getFav.call();
    }
  }, [addFavorites.fetching]);

  useEffect(() => {
    if (!deleteFavorites.fetching && !deleteFavorites.error) {
      listJobs.call(parcoursId);
      getFav.call();
    }
  }, [deleteFavorites.fetching]);

  useDidUpdate(() => {
    fetchingChange(listJobs.fetching);
  }, [listJobs.fetching]);

  function filterJobs(filterArray: string[], secteurArray: string[]) {
    secteursRef.current = secteurArray;
    filtersRef.current = filterArray;
    listJobs.call(parcoursId, JSON.stringify(filterArray), JSON.stringify(secteurArray));
  }

  const onJobRemove = (id: any, e?: React.MouseEvent<any>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    function remove() {
      deleteFavorites.call(id);
    }
    openModal(<DeleteModal onDelete={remove} onCloseModal={closeModal} />);
  };

  if (!otherJobsRef.current.length) {
    otherJobsRef.current = filter(listJobs.data, job => !job.secteur[0]);
  }

  const isExistInFav = (id: string) => {
    const test = getFav.data.data.some((item: any) => item.job._id === id);
    return test;
  };
  const isExistInFavAr = (id: string) => {
    const test = getFav.data.data.find((item: any) => item.job._id === id);
    return test ? test._id : null;
  };
  const handleCard = (id: string, idFav?: string) => {
    const idFavorie = idFav || isExistInFavAr(id);
    openModal(
      <JobModal
        onCloseModal={closeModal}
        confirme={closeModal}
        id={id}
        idFav={idFavorie}
        parcoursId={parcoursId}
        fetchingParcours={fetchingParcours}
        update={isExistInFav(id)}
        remove={(i, e) => onJobRemove(idFavorie, e)}
        addfav={() => getFav.call()}
      />,
    );
  };
  let jArray = listJobs.data.length ? listJobs.data : [];

  if (other) {
    let otherJobs = otherJobsRef.current;

    if (filtersRef.current.length) {
      otherJobs = otherJobs.filter(job =>
        job.environments.find(env => filtersRef.current.find(ft => env._id === ft)));
    }

    jArray = secteursRef.current.length ? [...jArray, ...otherJobs] : [...otherJobs];
    jArray = uniqBy(jArray, '_id');
  }

  const recommandedArray = jArray.filter((j, i) => i < 9);

  if (!jobsListRef.current.length && !isEmpty(jArray)) jobsListRef.current = recommandedArray;
  const otherArray = differenceBy(jArray, jobsListRef.current, '_id');

  const arrayNew: any = [];
  jobsListRef.current.forEach((item: any) => {
    recommandedArray.forEach((el: any) => {
      if (item._id === el._id) {
        arrayNew.push(item);
      }
    });
  });

  const [selectedJob, setJOb] = useState('');
  const handleClick = (id: string) => {
    createFavorites({
      job: id,
      parcour: parcoursId,
      interested: true,
    });
    /* addfav(); */
    getFav.call();
    setJOb(id);
  };

  // console.log(selectedJob)
  return (
    <div className={classes.container}>
      {fetching && (
        <div className={`fixed_fill flex_center ${classes.loading_container}`}>
          <Spinner />
        </div>
      )}
      <SideBar
        other={other}
        onOtherChange={useCallback(() => {
          setOther(!other);
        }, [other])}
        secteurs={getSecteurs.data}
        filterJobs={filterJobs}
        parcoursId={parcoursId}
      />
      <div className={classes.jobs_container}>
        <div className={classes.selections}>
          <div className={classes.selection_title} onClick={setSelectionToggle}>
            <img
              src={arrow}
              alt="l"
              className={isSelectionOpen ? classes.arrowRoteted : classes.arrow}
            />

            <div>Ma sélection</div>
          </div>
          <div
            className={classNames(
              isSelectionOpen ? classes.filter_containerOpen_child : classes.filter_container_child,
            )}
          >
            {map(getFav.data.data, (item: any) => (
              <JobSelection
                title={item.job.title}
                onClick={() => handleCard(item.job._id, item._id)}
                key={item.job._id}
              >
                <div
                  onClick={event => onJobRemove(item._id, event)}
                  className={classes.iconsContainer}
                >
                  {/*  <MultiIcon type="remove" width="22" height="22" className={classes.remove} /> */}
                  <Button title="x" color="red" className={classes.remove} />
                </div>
              </JobSelection>
            ))}
          </div>
        </div>
        <div className={classes.containerAllCards}>
          <div className={classes.selection_title} onClick={setRecommandedtoggle}>
            <img
              src={arrow}
              alt="l"
              className={isRecommandedOpen ? classes.arrowRoteted : classes.arrow}
            />
            <div>Mon top métier</div>
          </div>

          <div
            className={classNames(
              isRecommandedOpen
                ? classes.filter_containerOpen_child
                : classes.filter_container_child,
            )}
          >
            {arrayNew.map((metier: any) => {
              const index = jobsListRef.current.findIndex(job => job._id === metier._id);

              let rating: 0 | 1 | 2 | 3 = 0;
              let color = '#696b6d';
              if (index <= 2) {
                rating = 3;
                color = '#fab82d';
              } else if (index <= 5) {
                rating = 2;
                color = '#c8ccb0';
              } else if (index <= 8) {
                rating = 1;
                color = '#a67c52';
              }
              return (
                <JobCard
                  rating={rating}
                  color="#fab82d"
                  jobName={metier.title}
                  jobAccessebility={metier.accessibility}
                  jobDescription={metier.description}
                  jobInterest={metier.interests}
                  modal={() => handleCard(metier._id)}
                  key={metier._id}
                  add={() => handleClick(metier._id)}
                  selected={selectedJob === metier._id}
                />
              );
            })}
          </div>
        </div>
        <div className={classes.containerAllCards}>
          <div className={classes.selection_title} onClick={setOthertoggle}>
            <img
              src={arrow}
              alt="l"
              className={isOtherOpen ? classes.arrowRoteted : classes.arrow}
            />
            <div>Tous les métiers</div>
          </div>
          <div
            className={classNames(
              isOtherOpen ? classes.filter_containerOpen_child : classes.filter_container_child,
            )}
          >
            {otherArray.map(metier => (
              <JobCard
                rating={0}
                color="#696b6d"
                jobName={metier.title}
                jobAccessebility={metier.accessibility}
                jobDescription={metier.description}
                jobInterest={metier.interests}
                modal={() => handleCard(metier._id)}
                key={metier._id}
                add={() => handleClick(metier._id)}
                selected={selectedJob === metier._id && true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ parcours }: ReduxState): IMapToProps => ({
  parcoursId: parcours.data._id,
  families: parcours.data.families,
  fetchingParcours: parcours.fetching,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  openModal: (children, backdropClassName) =>
    dispatch(modalActions.openModal({ children, backdropClassName })),
  closeModal: () => dispatch(modalActions.closeModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withApis({
    getParcours,
    deleteFavorites,
    listJobs: getMyJob,
    getSecteurs,
    addFavorites: createFavorites,
    getFav: getFavorites,
  })(withLayout(JobsContainer)),
);
