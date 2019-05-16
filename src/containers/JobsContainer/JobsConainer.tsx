import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { map, forEach, filter } from 'lodash';
import { Redirect } from 'react-router-dom';

import withApis, { ApiComponentProps } from '../../hoc/withApi';
import { getMyJob, createFavorites, getParcours, IJob, ISecteur } from '../../requests';
import { useDidMount, useDidUpdate } from '../../hooks';
import { ReduxState } from 'reducers';
import Grid from '../../components/ui/Grid/Grid';
import JobCard from '../../components/cards/JobCard/JobCard';
import Spinner from '../../components/ui/Spinner/Spinner';
import Info from '../../components/ui/Info/Info';
import classes from './jobsContainer.module.scss';
import SideBar from '../../components/sideBar/SideBar/SideBar';

interface IMapToProps {
  parcoursId: string;
  families: string[];
}

interface Props
  extends ApiComponentProps<{
    listJobs: typeof getMyJob;
    addFavorites: typeof createFavorites;
    getParcours: typeof getParcours;
  }>,
    IMapToProps {}

const JobsContainer = ({ listJobs, parcoursId, addFavorites, getParcours, families }: Props) => {
  const [fetching, fetchingChange] = useState(false);
  const [selectedSecteurs, selectedSecteursChange] = useState([] as string[]);

  if (!families.length) return <Redirect to={'/profile'} />;

  const onSecteurClick = (secteur: { _id: string; title: string; isSelected?: boolean }) => {
    if (!secteur.isSelected) selectedSecteursChange([...selectedSecteurs, secteur._id]);
    else selectedSecteursChange(selectedSecteurs.filter(id => id !== secteur._id));
  };

  useDidMount(() => {
    getParcours.call(parcoursId);
  });

  useEffect(() => {
    if (!addFavorites.fetching && !addFavorites.error) {
      listJobs.call(parcoursId);
    }
  },        [addFavorites.fetching]);

  useDidUpdate(() => {
    fetchingChange(listJobs.fetching);
  },           [listJobs.fetching]);
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
    secteurs.push({ ...autres.secteur, isSelected: !!selectedSecteurs.find(id => id === autres.secteur._id) });
  }

  const renderJob = (job: IJob) => {
    const onLikeClick = () => {
      if (!job.interested) {
        addFavorites.call({
          interested: true,
          job: job._id,
          parcour: parcoursId,
        });
        fetchingChange(true);
      }
    };

    const onDislikeClick = () => {
      if (job.interested || job.interested === null) {
        addFavorites.call({
          interested: false,
          job: job._id,
          parcour: parcoursId,
        });
        fetchingChange(true);
      }
    };

    return (
      <Grid key={job._id} item xl={4} lg={6} smd={12}>
        <JobCard
          onLikeClick={onLikeClick}
          onDislikeClick={onDislikeClick}
          interested={job.interested}
          title={job.title}
        />
      </Grid>
    );
  };

  const renderJobPortion = (job: { secteur: any; jobs: IJob[] }) => {
    return (
      <Grid key={job.secteur._id} className={classes.job_portion} container padding={{ xl: 0 }}>
        <Grid className={classes.secteur} item xl={12}>
          {job.secteur.title}
        </Grid>
        {map(job.jobs, renderJob)}
      </Grid>
    );
  };

  let selectedJobs = jobs;

  if (selectedSecteurs.length) {
    selectedJobs = jobs.filter(job => selectedSecteurs.find(id => job.secteur._id === id));
  }

  return (
    <div className={classes.container}>
      {fetching && (
        <div className={`fixed_fill flex_center ${classes.loading_container}`}>
          <Spinner />
        </div>
      )}
      <SideBar onItemClick={onSecteurClick} title={'liste des secteurs'} options={secteurs} />
      <div className={classes.jobs_container}>
        <Grid container>
          <Grid item xl={12} className={classes.title}>
            Lorem ipsum dolores
          </Grid>
          <Grid item xl={12}>
            <Info>
              <span className={classes.info}>Lorem ipsum dolores nec mergitur curiculum vitae post scriptum</span>
            </Info>
          </Grid>

          <Grid item xl={12} lg={12}>
            {selectedJobs.map(renderJobPortion)}
            {autres.jobs.length && (!selectedSecteurs.length || selectedSecteurs.find(id => id === 'Autre'))
              ? renderJobPortion(autres)
              : null}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = ({ parcours }: ReduxState): IMapToProps => ({
  parcoursId: parcours.data._id,
  families: parcours.data.families,
});

export default connect(mapStateToProps)(
  withApis({ getParcours, listJobs: getMyJob, addFavorites: createFavorites })(JobsContainer),
);
