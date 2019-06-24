import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { map, forEach, filter, isEmpty } from 'lodash';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import withApis, { ApiComponentProps } from '../../hoc/withApi';
import { getMyJob, createFavorites, getParcours, IJob, ISecteur, deleteFavorites } from '../../requests';
import { useDidMount, useDidUpdate } from '../../hooks';
import { ReduxState } from 'reducers';
import Grid from '../../components/ui/Grid/Grid';
import JobCard from '../../components/cards/JobCard/JobCard';
import Spinner from '../../components/ui/Spinner/Spinner';
import Info from '../../components/ui/Info/Info';
import classes from './jobsContainer.module.scss';
import SideBar from '../../components/sideBar/SideBar/SideBar';
import ContinueButton from '../../components/buttons/ContinueButtom/ContinueButton';
import Card from '../../components/cards/Card/Card';
import Carousel from '../../components/ui/Carousel/Carousel';

interface IMapToProps {
  parcoursId: string;
  families: string[];
}

interface Props
  extends ApiComponentProps<{
    listJobs: typeof getMyJob;
    addFavorites: typeof createFavorites;
    getParcours: typeof getParcours;
    deleteFavorites: typeof deleteFavorites;
  }>,
    IMapToProps {}

const JobsContainer = ({
  listJobs,
  parcoursId,
  addFavorites,
  getParcours,
  families,
  history,
  deleteFavorites,
}: Props & RouteComponentProps) => {
  const [fetching, fetchingChange] = useState(false);
  const [selectedSecteurs, selectedSecteursChange] = useState([] as string[]);

  if (!families.length) return <Redirect to={'/profile'} />;

  const onSecteurClick = (secteur: { _id: string; title: string; isSelected?: boolean }) => {
    /*   if (!secteur.isSelected) selectedSecteursChange([...selectedSecteurs, secteur._id]);
    else selectedSecteursChange(selectedSecteurs.filter(id => id !== secteur._id)); */
  };

  useDidMount(() => {
    getParcours.call(parcoursId);
  });

  useEffect(() => {
    if (!addFavorites.fetching && !addFavorites.error) {
      listJobs.call(parcoursId);
    }
  },        [addFavorites.fetching]);

  useEffect(() => {
    if (!deleteFavorites.fetching && !deleteFavorites.error) {
      listJobs.call(parcoursId);
    }
  },        [deleteFavorites.fetching]);

  useDidUpdate(() => {
    fetchingChange(listJobs.fetching);
  },           [listJobs.fetching]);

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
    secteurs.push({ ...autres.secteur, isSelected: !!selectedSecteurs.find(id => id === autres.secteur._id) });
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
          <span className={classes.jobSecteur}>{!isEmpty(job.secteur) ? job.secteur[0].title : ''}</span>
          <span className={classes.jobTitle}>{job.title}</span>
          <span data-tip data-for={job._id} className={classes.jobinfo}>
            {job.description}
          </span>
          <span className={classes.jobEntry}>Niveau d’accès au métier :{job.accessibility} </span>
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

  const sections = [...selectedJobs, autres];

  return (
    <div className={classes.container}>
      {fetching && (
        <div className={`fixed_fill flex_center ${classes.loading_container}`}>
          <Spinner />
        </div>
      )}
      <SideBar
        onItemClick={onSecteurClick}
        title={'Mes pistes métiers préférés'}
        options={filter(listJobs.data, job => !!job.interested)}
        numberOfLine={2}
        onItemRemove={onJobRemove}
      />
      <div className={classes.jobs_container}>
        <Grid container>
          <Grid item xl={12} className={classes.title}>
            Mes pistes métiers
          </Grid>
          <Grid item xl={12}>
            <Info backgroundColor={'#f9f3f3'}>
              <span className={classes.info}>Sélectionne des métiers que tu aimerais découvrir</span>
              <br />
              <span className={classes.italic_text}>
                Tu peux filtrer les différents secteurs en les sélectionnant dans la colonne de gauche
              </span>
            </Info>
          </Grid>
          <Grid item xl={12} lg={12}>
            <Carousel
              className={classes.carousel}
              sections={sections.map(section => ({
                title: section.secteur.title,
                data: section.jobs,
                secteur: section.secteur,
              }))}
              renderItem={renderJob}
              itemWrapperComponent={<Grid item xl={6} lg={12} md={12} smd={12} />}
              itemKeyExtractor={job => job._id}
              renderTitle={({ title }) => (
                <Grid className={classes.secteur} item xl={12}>
                  {title}
                </Grid>
              )}
            />
          </Grid>
          <Grid item xl={12} className={classes.btn_container_jobs}>
            <ContinueButton className={classes.btn_jobs} onClick={onNavigate} label="Terminer" />
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
  withApis({ getParcours, deleteFavorites, listJobs: getMyJob, addFavorites: createFavorites })(JobsContainer),
);
