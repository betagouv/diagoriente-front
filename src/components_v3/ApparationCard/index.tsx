import React, { useState } from 'react';
import classes from './ApparationCard.module.scss';
import classNames from '../../utils/classNames';
import CountUp from 'react-countup';
import star from '../../assets/icons/stars/ic_star_full.svg';

interface Props {
  color?: string;
  taux?: number;
  title: string;
  favori?: boolean;
  modeEdit?: boolean;
}

const ApparationCard = ({ color, taux, title, favori, modeEdit }: Props) => {
  const [clicked, changeClicked] = useState(false);

  return (
    <div className={classes.CardContainer}>
      <div
        className={classNames(classes.Triangle, clicked ? classes.RotateTriangleTop : classes.RotateTriangleBottom)}
        onClick={() => {
          changeClicked(!clicked);
        }}
      />
      <div className={classes.CardApp}>
        <div className={classes.etiquette} style={{ backgroundColor: color }} />
        <div className={classes.restCard}>
          {!modeEdit && <div className={classes.progress} style={{ width: `${taux}%` }} />}
          <div className={classes.contentContainer}>
            <span className={classes.title} style={{ color: favori ? '#ffd700' : '#696b6d' }}>
              {title}
            </span>
            {favori && <img src={star} alt={'star'} className={classes.star} />}
          </div>
         { !modeEdit && <span className={classes.taux} style={{ color }}>
            <CountUp start={0} end={taux} duration={1.4} delay={0.1} />%
          </span>}
        </div>
      </div>
    </div>
  );
};

export default ApparationCard;
