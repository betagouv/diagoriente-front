import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';

import Header from '../../layout/Header/Header';

import withApis, { ApiComponentProps } from '../../hoc/withApi';
import { getMyJob, createFavorites, getParcours } from '../../requests';
import { useDidMount, useDidUpdate } from '../../hooks';
import { ReduxState } from 'reducers';
import Grid from '../../components/ui/Grid/Grid';
import JobCard from '../../components/cards/JobCard/JobCard';
import Spinner from '../../components/ui/Spinner/Spinner';
import Info from '../../components/ui/Info/Info';
import classes from './jobsContainer.module.scss';
import CardProgress from '../../components/cards/CardProgress/CardProgress';
import CardCompetence from '../../components/cards/CardCompetence/Competence';

interface IMapToProps {
  parcoursId: string;
}

interface Props
  extends ApiComponentProps<{
    listJobs: typeof getMyJob;
    addFavorites: typeof createFavorites;
    getParcours: typeof getParcours;
  }>,
    IMapToProps {}

const JobsContainer = ({ listJobs, parcoursId, addFavorites, getParcours }: Props) => {
  const [fetching, fetchingChange] = useState(false);

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

  return (
    <>
      <Header showLogout={false} />
      {fetching && (
        <div className={`fixed_fill flex_center ${classes.loading_container}`}>
          <Spinner />
        </div>
      )}
      <Grid container>
        <Grid item xl={12} className={classes.title}>
          Lorem ipsum dolores
        </Grid>
        <Grid item xl={12}>
          <Info>
            <span className={classes.info}>Lorem ipsum dolores nec mergitur curiculum vitae post scriptum</span>
          </Info>
        </Grid>

        <Grid item xl={8} lg={12}>
          <Grid container padding={{ xl: 0 }}>
            {map(listJobs.data, job => {
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
                <Grid key={job._id} item xl={4} md={6} smd={12}>
                  <JobCard
                    onLikeClick={onLikeClick}
                    onDislikeClick={onDislikeClick}
                    interested={job.interested}
                    title={job.title}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid className={classes.competence_container} item xl={4} lg={12}>
          <CardProgress progress={4} />
          <CardCompetence parcours={getParcours.data.globalCopmetences} />
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = ({ parcours }: ReduxState): IMapToProps => ({
  parcoursId: parcours.data._id,
});

export default connect(mapStateToProps)(
  withApis({ getParcours, listJobs: getMyJob, addFavorites: createFavorites })(JobsContainer),
);
