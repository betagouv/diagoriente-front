import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import CountUp from 'react-countup';
import ConfirmModal from 'components/modals/ConfirmStar/ComfirmModal';
import modalActions from 'reducers/modal';
import { IExpertise } from 'reducers';
import ReactTooltip from 'react-tooltip';
import classes from './ApparationCard.module.scss';
import classNames from '../../utils/classNames';
import star from '../../assets/icons/stars/ic_star_full.svg';

interface IDispatchToProps {
  openModal: (children: JSX.Element, backdropClassName?: string) => void;
  closeModal: () => void;
}
interface Props
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    IDispatchToProps {
  color?: string;
  taux?: number;
  title: string;
  favori?: boolean;
  withProgressBar?: boolean;
  isChecked?: boolean;
  withCheckBox?: boolean;
  state?: number;
  expertise?: IExpertise;
  checkboxHandler?: (expert: IExpertise) => void;
  clickHandler?: (value: number) => void;
  withDots?: boolean;
  active?: boolean;
  index?: number;
}

const ApparationCard = ({
  color,
  taux,
  title,
  favori,
  withProgressBar,
  withCheckBox,
  state,
  isChecked,
  clickHandler,
  withDots,
  active,
  index,
  expertise,
  checkboxHandler,
  className,
  children,
  openModal,
  closeModal,
  ...other
}: Props & React.HTMLAttributes<HTMLElement>) => {
  function onChange(value: number) {
    if (clickHandler) {
        clickHandler(value);
    }
  }

  const dots = [];

  if (withDots) {
    for (let i = 0; i < 4; i += 1) {
      dots.push(
        <div>
          <div
            onClick={() => onChange(state === i + 1 ? 0 : i + 1)}
            key={i}
            className={classNames(classes.dot, state === i + 1 && classes.dot_selected)}
            style={state && state >= i + 1 ? { background: color, border: 'none' } : {}}
            data-tip
            data-for={expertise && expertise._id + i}
          />
          <ReactTooltip
            id={expertise && expertise._id + i}
            place="right"
            type="light"
            className={classes.tooltip}
          >
            <span style={{ fontWeight: 600, display: 'block' }}>
              {expertise && expertise.niveau[i].title}
            </span>
            <span>{expertise && expertise.niveau[i].sub_title}</span>
          </ReactTooltip>
        </div>,
      );
    }
  }

  return (
    <div
      className={classNames(
        classes.CardContainer,
        withDots && classes.CardContainerWithDots,
        withCheckBox && classes.CardContainerWithCheckbox,
      )}
      aria-pressed={isChecked}
      onClick={() => {
        if (withCheckBox && checkboxHandler && expertise) {
          checkboxHandler(expertise);
        }
      }}
    >
      {withProgressBar && clickHandler && (index || index === 0) && (
        <div
          className={classNames(
            classes.Triangle,
            active ? classes.RotateTriangleTop : classes.RotateTriangleBottom,
          )}
          onClick={() => clickHandler(index)}
          style={{ borderColor: `transparent transparent transparent ${color}` }}
        />
      )}
      {withCheckBox && checkboxHandler && expertise && (
        <input type="checkbox" checked={isChecked} onChange={() => checkboxHandler(expertise)} />
      )}
      <div className={classes.CardApp} {...other}>
        <div className={classes.etiquette} style={{ backgroundColor: color }} />
        <div className={classes.restCard}>
          {withProgressBar && <div className={classes.progress} style={{ width: `${taux}%` }} />}
          <div className={classes.contentContainer}>
            <span
              className={classNames(classes.title, className)}
              style={{ color: favori ? '#fab82d' : '#696b6d' }}
            >
              {title}
            </span>
            {favori && <img src={star} alt="star" className={classes.star} />}
          </div>
          {withProgressBar && (
            <span className={classes.taux} style={{ color }}>
              <CountUp start={0} end={taux} duration={1.4} delay={0.1} />
%
            </span>
          )}
        </div>
      </div>
      <div className={classes.dotsContainer}>{dots}</div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchToProps => ({
  openModal: (children, backdropClassName) =>
    dispatch(modalActions.openModal({ children, backdropClassName })),
  closeModal: () => dispatch(modalActions.closeModal()),
});
export default connect(
  null,
  mapDispatchToProps,
)(ApparationCard);
