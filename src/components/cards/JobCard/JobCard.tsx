import React from 'react';
import { map } from 'lodash';
import ReactTooltip from 'react-tooltip';

import classes from './jobCard.module.scss';
import classNames from '../../../utils/classNames';
import Grid from '../../ui/Grid/Grid';

import iconLike from '../../../assets/icons/svg/ic-like-01.svg';
import iconDislike from '../../../assets/icons/svg/ic-dislike-01.svg';
interface Props {
  title: string;
  interested: boolean | null;
  onLikeClick: () => void;
  onDislikeClick: () => void;
  showButtons: boolean;
  job?: any;
}

const JobCard = ({ title, interested, onDislikeClick, onLikeClick, showButtons, job }: Props) => {
  const showLike = showButtons || interested === true;
  const showDislike = showButtons || interested === false;
  let length: number = 300;
  console.log(job);
  if (job) {
    length = job.description.length;
  }

  return (
    <div
      className={classNames(classes.container_1, 'flex_center', interested !== null && classes.container_interested)}
      data-tip data-for={job._id}
    >
      {interested !== null && (
        <div className={classNames('absolute_fill', interested ? classes.interested : classes.not_interested)} />
      )}
      <div className={classes.title}>{title}</div>

      <div className={classes.header}>
        <div className={classes.title}>{map(job.secteur, secteur => secteur.title)}</div>
        <div className={classNames(length > 200 ? classes.text_container : classes.text_short)}>
          <span>{job.description}</span>
          <ReactTooltip id={job._id} place="top" type="light" className={classes.tooltip}>
            {job.description}
          </ReactTooltip>
        </div>
      </div>
      <div className={classes.title}>Niveau d’entrée en formation : {job.accessibility}</div>

      <div className={classes.footer}>
        <Grid padding={{ xl: 0 }} spacing={{ xl: 9 }} container>
          <Grid
            onClick={onLikeClick}
            className={classNames(
              classes.footer_button,
              'flex_center',
              interested === true && classes.footer_like_active,
              !showLike && classes.footer_hidden_button,
            )}
            item
            xl={8}
          >
            {showLike && (
              <>
                <img className={classes.img} src={iconLike} />
                <span className={classes.like}>J'aime</span>
              </>
            )}
          </Grid>

          <Grid
            onClick={onDislikeClick}
            className={classNames(
              classes.footer_button,
              'flex_center',
              classes.footer_dislike,
              interested === false && classes.footer_dislike_active,
              !showDislike && classes.footer_hidden_button,
            )}
            item
            xl={4}
          >
            {showDislike && <img className={classes.img} src={iconDislike} />}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

JobCard.defaultProps = {
  onLikeClick: () => {},
  onDislikeClick: () => {},
  showButtons: true,
};

export default JobCard;
