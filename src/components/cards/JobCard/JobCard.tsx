import React from 'react';

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
}

const JobCard = ({ title, interested, onDislikeClick, onLikeClick }: Props) => {
  return (
    <div className={classNames(classes.container, 'flex_center', interested !== null && classes.container_interested)}>
      {interested !== null && (
        <div className={classNames('absolute_fill', interested ? classes.interested : classes.not_interested)} />
      )}
      <div className={classes.title}>{title}</div>

      <div className={classes.footer}>
        <Grid padding={{ xl: 0 }} spacing={{ xl: 9 }} container>
          <Grid
            onClick={onLikeClick}
            className={classNames(
              classes.footer_button,
              'flex_center',
              interested === true && classes.footer_like_active,
            )}
            item
            xl={8}
          >
            <img className={classes.img} src={iconLike} />
            <span className={classes.like}>J'aime</span>
          </Grid>
          <Grid
            onClick={onDislikeClick}
            className={classNames(
              classes.footer_button,
              'flex_center',
              classes.footer_dislike,
              interested === false && classes.footer_dislike_active,
            )}
            item
            xl={4}
          >
            <img className={classes.img} src={iconDislike} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

JobCard.defaultProps = {
  onLikeClick: () => {},
  onDislikeClick: () => {},
};

export default JobCard;
