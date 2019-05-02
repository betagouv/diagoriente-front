import React, { useState } from 'react';
import classes from './stars.module.scss';
import classNames from '../../utils/classNames';
import star_full from '../../assets/icons/stars/ic_star_full.svg';
import star_opacity from '../../assets/icons/stars/ic_star_opacity.svg';
import star_empty from '../../assets/icons/stars/ic_star_empty.svg';

const stars = ({ className, children, ...other }: React.HTMLAttributes<HTMLElement>) => {
  const [star, setStar] = useState(star_empty);
  const [checked, setchecked] = useState(false);
  const toggleStar = () => {
    setchecked(!checked);
  };
  const onleave = () => {
    if (checked) {
      setStar(star_full);
    } else {
      setStar(star_empty);
    }
  };

  const MouseOver = () => {
    if (checked) {
      setStar(star_opacity);
    } else {
      setStar(star_opacity);
    }
  };

  return (
    <div className={classNames(classes.container, className)} {...other}>
      <img
        src={star}
        alt="star"
        className={classes.star}
        onMouseOver={MouseOver}
        onMouseLeave={onleave}
        onClick={toggleStar}
      />
    </div>
  );
};

export default stars;
