import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import classes from './continueButton.module.scss';
import start_arrow from '../../../assets/icons/start-arrow.png';
import Spinner from '../../ui/Spinner/Spinner';
import classNames from '../../../utils/classNames';
interface IProps {
  isFetching?: boolean;
  label?: string;
}
const ContinueButton = ({
  isFetching,
  ...props
}: IProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return (
    <button {...props} className={classNames(classes.button, props.className)}>
      <span className={classes.btn_text}>{props.label ? props.label : 'Continuer'}</span>
      {isFetching ? <Spinner /> : <img className={classes.arrow} src={start_arrow} alt="start" />}
    </button>
  );
};

export default ContinueButton;
