import React, { Dispatch, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { forEach, filter, isEmpty } from 'lodash';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import modalActions from 'reducers/modal';
import { AnyAction } from 'redux';

import { ReduxState } from 'reducers';
import withLayout from 'hoc/withLayout';

import JobSelection from 'components_v3/jobSelection/jobSelction';
import JobCard from 'components_v3/jobCard/jobCard';
import JobModal from 'components/modals/jobModal/jobModal';
import withApis, { ApiComponentProps } from '../../hoc/withApi';
import {
  getMyJob,
  createFavorites,
  getParcours,
  IJob,
  getSecteurs,
  ISecteur,
  deleteFavorites,
} from '../../requests';
import { useDidMount, useDidUpdate } from '../../hooks';
import Spinner from '../../components/ui/Spinner/Spinner';
import classes from './jobsContainer.module.scss';
import SideBar from '../../components/sideBar/SideBar/SideBar';
import Card from '../../components/cards/Card/Card';

interface IMapToProps {
  parcoursId: string;
  families: string[];
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
  openModal,
  closeModal,
}: Props & RouteComponentProps) => {
  const [fetching, fetchingChange] = useState(false);
  const [selectedSecteurs, selectedSecteursChange] = useState([] as string[]);

  const onSecteurClick = (secteur: { _id: string; title: string; isSelected?: boolean }) => {
    /*   if (!secteur.isSelected) selectedSecteursChange([...selectedSecteurs, secteur._id]);
    else selectedSecteursChange(selectedSecteurs.filter(id => id !== secteur._id)); */
  };

  useDidMount(() => {
    getParcours.call(parcoursId);
    getSecteurs.call();
  });
  useEffect(() => {
    if (!addFavorites.fetching && !addFavorites.error) {
      listJobs.call(parcoursId);
    }
  }, [addFavorites.fetching]);

  useEffect(() => {
    if (!deleteFavorites.fetching && !deleteFavorites.error) {
      listJobs.call(parcoursId);
    }
  }, [deleteFavorites.fetching]);

  useDidUpdate(() => {
    fetchingChange(listJobs.fetching);
  }, [listJobs.fetching]);

  function filterJobs(filterArray: string[], secteurArray: string[]) {
    listJobs.call(parcoursId, JSON.stringify(filterArray), JSON.stringify(secteurArray));
  }

  if (!families.length) return <Redirect to="/profile" />;

  const onJobRemove = (job: any) => {
    deleteFavorites.call(job.favoriteId);
    fetchingChange(true);
  };

  const jobs: { secteur: ISecteur; jobs: IJob[] }[] = [];
  forEach(listJobs.data, job => {
    if (job.secteur[0]) {
      const current = jobs.find(secteurJobs => secteurJobs.secteur._id === job.secteur[0]._id);
      if (current) {
        current.jobs.push(job);
      } else {
        jobs.push({ secteur: job.secteur[0], jobs: [job] });
      }
    }
  });

  const onNavigate = () => {
    history.push('/profile');
  };
  const autres = {
    secteur: {
      _id: 'Autre',
      title: 'Autre',
      activities: null,
      parentId: null,
      search: '',
      type: '',
      resources: {
        backgroundColor: '',
        icon: '',
      },
    },
    jobs: filter(listJobs.data, job => !job.secteur[0]),
  };

  const secteurs = jobs.map(job => ({
    ...job.secteur,
    isSelected: !!selectedSecteurs.find(id => id === job.secteur._id),
  }));
  if (autres.jobs.length) {
    secteurs.push({
      ...autres.secteur,
      isSelected: !!selectedSecteurs.find(id => id === autres.secteur._id),
    });
  }
  const renderJob = (job: IJob) => {
    const onClickJob = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (job.interested && job.favoriteId) {
        deleteFavorites.call(job.favoriteId);
        fetchingChange(true);
      } else if (!job.interested) {
        addFavorites.call({
          interested: true,
          job: job._id,
          parcour: parcoursId,
        });
        fetchingChange(true);
      }
    };

    return (
      <div className={classes.cardWrapper}>
        <Card className={classes.cardJob} checked={job.interested} onClick={onClickJob}>
          <span className={classes.jobSecteur}>
            {!isEmpty(job.secteur) ? job.secteur[0].title : ''}
          </span>
          <span className={classes.jobTitle}>{job.title}</span>
          <span data-tip data-for={job._id} className={classes.jobinfo}>
            {job.description}
          </span>
          <span className={classes.jobEntry}>
            {`Niveau d’accès au métier: ${job.accessibility}`}
          </span>
          <ReactTooltip id={job._id} place="top" type="light" className={classes.tooltip}>
            {job.description}
          </ReactTooltip>
        </Card>
      </div>
    );
  };

  let selectedJobs = jobs;

  if (selectedSecteurs.length) {
    selectedJobs = jobs.filter(job => selectedSecteurs.find(id => job.secteur._id === id));
  }
  const handleCard = (id: string) => {
    openModal(<JobModal onCloseModal={closeModal} confirme={closeModal} id={id} parcoursId={parcoursId} />);
  };

  // const sections = [...selectedJobs, autres];
  const jArray = jobs.map(el => el.jobs.map(al => al)).flat(1);
  return (
    <div className={classes.container}>
      {fetching && (
        <div className={`fixed_fill flex_center ${classes.loading_container}`}>
          <Spinner />
        </div>
      )}
      <SideBar secteurs={getSecteurs.data} filterJobs={filterJobs} parcoursId={parcoursId} />
      <div className={classes.jobs_container}>
        <div className={classes.selections}>
          <JobSelection title="Technicien en application industrielle" withRemove />
        </div>
        <div className={classes.cardsContainer}>
          {jArray.map((metier, index) => (
            <JobCard
              rating={index <= 2 ? 3 : index <= 5 ? 2 : index <= 8 ? 1 : 0}
              color={
                index <= 2 ? '#fab82d' : index <= 5 ? '#c8ccb0' : index <= 8 ? '#a67c52' : '#696b6d'
              }
              jobName={metier.title}
              jobAccessebility={metier.accessibility}
              jobDescription={metier.description}
              jobInterest={metier.interests}
              onClick={() => handleCard(metier._id)}
              key={metier._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ parcours }: ReduxState): IMapToProps => ({
  parcoursId: parcours.data._id,
  families: parcours.data.families,
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
  })(withLayout(JobsContainer)),
);
