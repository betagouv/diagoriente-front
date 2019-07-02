import React from 'react';
import classes from './progressCompetence.module.scss';
import { getWidth } from '../../../../utils/getWidth';
import classNames from '../../../../utils/classNames';
import dot1 from '../../../../assets/icons/Dots/niveau1.png';
import dot2 from '../../../../assets/icons/Dots/niveau2.png';
import dot3 from '../../../../assets/icons/Dots/niveau3.png';
import dot4 from '../../../../assets/icons/Dots/niveau4.png';
import greyDot from '../../../../assets/icons/Dots/greyDot.svg';
import ReactTooltip from 'react-tooltip';

interface IProps {
  width: number;
  color?: string;
  title?: string;
  sub_title?: string;
}

const ProgressBarCompetence = ({ width, color, title, sub_title }: IProps) => {
  return (
    <div className={classes.wrapper}>
      <ReactTooltip id={title} type="light" className={classes.tooltip_star}>
        <div>
          <span className={classes.bold_tooltip}>{title}</span>
          <span>{sub_title}</span>
        </div>
      </ReactTooltip>
      {width >= 1 ? (
        <img data-for={title} data-tip className={classes.dots} src={dot1} />
      ) : (
        <img data-for={title} data-tip className={classes.dots} src={greyDot} />
      )}
      {width >= 2 ? (
        <img data-for={title} data-tip className={classes.dots} src={dot2} />
      ) : (
        <img data-for={title} data-tip className={classes.dots} src={greyDot} />
      )}
      {width >= 3 ? (
        <img data-for={title} data-tip className={classes.dots} src={dot3} />
      ) : (
        <img data-for={title} data-tip className={classes.dots} src={greyDot} />
      )}
      {width >= 4 ? (
        <img data-for={title} data-tip className={classes.dots} src={dot4} />
      ) : (
        <img data-for={title} data-tip className={classes.dots} src={greyDot} />
      )}
    </div>
  );
};
export default ProgressBarCompetence;
