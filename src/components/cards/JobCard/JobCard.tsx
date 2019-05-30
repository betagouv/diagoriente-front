import React from 'react';
import { map } from 'lodash';
import ReactTooltip from 'react-tooltip';

import classes from './jobCard.module.scss';
import classNames from '../../../utils/classNames';
import Grid from '../../ui/Grid/Grid';

import iconLike from '../../../assets/icons/svg/ic-like-01.svg';
import iconLikeRed from '../../../assets/icons/svg/ic-like-red.svg';
import iconLikeGrey from '../../../assets/icons/svg/ic-like-grey.svg';
import iconDislike from '../../../assets/icons/svg/ic-dislike-01.svg';
import iconDislikeBlue from '../../../assets/icons/svg/ic-dislike-blue.svg';
import iconDislikeGrey from '../../../assets/icons/svg/ic-dislike-grey.svg';
interface Props {
  title: string;
  interested: boolean | null;
  onLikeClick: () => void;
  onDislikeClick: () => void;
  showButtons: boolean;
  job?: any;
}

const JobCard = ({ title, interested, onDislikeClick, onLikeClick, showButtons, job }: Props) => {
  const showLike = showButtons || interested === null;
  const showDislike = showButtons || interested === null;
  let length: number = 300;
  if (job) {
    length = job.description.length;
  }

  return (
    <div
      className={classNames(classes.container_1, 'flex_center', interested !== null && classes.container_interested)}
    >
      {interested !== null && (
        <div className={classNames('absolute_fill', interested ? classes.interested : classes.not_interested)} />
      )}
      <div className={classes.title}>{title}</div>

      <div className={classes.header}>
        <div className={classes.title}>{map(job.secteur, secteur => secteur.title)}</div>
        <div className={classNames(length > 200 ? classes.text_container : classes.text_short)}>
          <span data-tip data-for={job._id}>
            {job.description}
          </span>
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
            onMouseOver={(e: any) => {
              const hover = e.currentTarget.querySelector('img');
              if (hover) {
                hover.src = iconLike;
              }
            }}
            onMouseLeave={(e: any) => {
              const hover = e.currentTarget.querySelector('img');
              if (hover) {
                if (interested === false) {
                  hover.src = iconLikeGrey;
                } else if (interested === true) {
                  hover.src = iconLikeRed;
                }
              }
            }}
          >
            {showLike && (
              <>
                <img
                  className={classes.img}
                  src={
                    interested === true
                      ? iconLikeRed
                      : interested === false
                      ? iconLikeGrey
                      : interested === null
                      ? iconLike
                      : iconLike
                  }
                />
                <span className={interested === false ? classes.likeGrey : classes.like}>J'aime</span>
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
            onMouseOver={(e: any) => {
              const hover = e.currentTarget.querySelector('img');
              if (hover) {
                hover.src = iconDislike;
              }
            }}
            onMouseLeave={(e: any) => {
              const hover = e.currentTarget.querySelector('img');
              if (hover) {
                if (interested === false) {
                  hover.src = iconDislikeBlue;
                } else if (interested === true) {
                  hover.src = iconDislikeGrey;
                }
              }
            }}
          >
            {showDislike && (
              <img
                className={classes.img}
                src={
                  interested === false
                    ? iconDislikeBlue
                    : interested === true
                    ? iconDislikeGrey
                    : interested === null
                    ? iconDislike
                    : iconDislike
                }
              />
            )}
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
