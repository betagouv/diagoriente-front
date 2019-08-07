import React from 'react';
import CountUp from 'react-countup';
import classes from './ApparationCard.module.scss';
import classNames from '../../utils/classNames';
import star from '../../assets/icons/stars/ic_star_full.svg';

interface Props
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: string;
  taux?: number;
  title: string;
  favori?: boolean;
  withProgressBar?: boolean;
  withCheckBox?: boolean;
  state?: number;
  clickHandler?: (value: number) => void;
  withDots?: boolean;
}

const ApparationCard = ({
  color,
  taux,
  title,
  favori,
  withProgressBar,
  withCheckBox,
  state,
  clickHandler,
  withDots,
}: Props) => {
  function onChange(value: number) {
    if (clickHandler) {
      clickHandler(value);
    }
  }

  const dots = [];

  if (withDots) {
    for (let i = 0; i < 4; i += 1) {
      dots.push(
        <div
          onClick={() => onChange(state === i + 1 ? 0 : i + 1)}
          key={i}
          className={classNames(classes.dot, state === i + 1 && classes.dot_selected)}
        />,
      );
    }
  }

  return (
    <div className={classes.CardContainer}>
      {withProgressBar && clickHandler && (
        <div
          className={classNames(
            classes.Triangle,
            state ? classes.RotateTriangleTop : classes.RotateTriangleBottom,
          )}
          onClick={() => onChange(5 - (state as number))}
          style={{ borderColor: `transparent transparent transparent ${color}` }}
        />
      )}
      {withCheckBox && clickHandler && (
        <input
          type="checkbox"
          checked={state === 5}
          onChange={() => onChange(5 - (state as number))}
        />
      )}
      <div className={classes.CardApp}>
        <div className={classes.etiquette} style={{ backgroundColor: color }} />
        <div className={classes.restCard}>
          {withProgressBar && <div className={classes.progress} style={{ width: `${taux}%` }} />}
          <div className={classes.contentContainer}>
            <span className={classes.title} style={{ color: favori ? '#ffd700' : '#696b6d' }}>
              {title}
            </span>
            {favori && <img src={star} alt="star" className={classes.star} />}
            {dots}
          </div>
          {withProgressBar && (
            <span className={classes.taux} style={{ color }}>
              <CountUp start={0} end={taux} duration={1.4} delay={0.1} />
%
            </span>
          )}
        </div>
        {withProgressBar && (
          <span className={classes.taux} style={{ color }}>
            <CountUp start={0} end={taux} duration={1.4} delay={0.1} />
%
          </span>
        )}
      </div>
    </div>
  );
};
export default ApparationCard;
