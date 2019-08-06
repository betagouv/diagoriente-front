import React from 'react';
import classes from './ApparationCard.module.scss';
import classNames from '../../utils/classNames';
import CountUp from 'react-countup';
import star from '../../assets/icons/stars/ic_star_full.svg';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: string;
  taux?: number;
  title: string;
  favori?: boolean;
  withProgressBar?: boolean;
  withCheckBox?: boolean;
  state: boolean;
  clickHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApparationCard = ({ color, taux, title, favori, withProgressBar, withCheckBox, state, clickHandler }: Props) => {
  return (
    <div className={classes.CardContainer}>
      {withProgressBar && (
        <div
          className={classNames(classes.Triangle, state ? classes.RotateTriangleTop : classes.RotateTriangleBottom)}
          onClick={() => clickHandler(!state)}
        />
      )}{' '}
      {withCheckBox && <input type="checkbox" checked={state} onChange={() => clickHandler(!state)} />}
      <div className={classes.CardApp}>
        <div className={classes.etiquette} style={{ backgroundColor: color }} />
        <div className={classes.restCard}>
          {withProgressBar && <div className={classes.progress} style={{ width: `${taux}%` }} />}
          <div className={classes.contentContainer}>
            <span className={classes.title} style={{ color: favori ? '#ffd700' : '#696b6d' }}>
              {title}
            </span>
            {favori && <img src={star} alt={'star'} className={classes.star} />}
          </div>
          {withProgressBar && (
            <span className={classes.taux} style={{ color }}>
              <CountUp start={0} end={taux} duration={1.4} delay={0.1} />%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApparationCard;
