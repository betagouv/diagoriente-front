import React from 'react';
import classes from './validIcon.module.scss';
import valid from '../../../assets_v3/icons/validate/validate.svg';
import classNames from '../../../utils/classNames';

interface Props {
  color?: string;
}

const Valid = ({ className, color, ...other }: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={classNames(classes.validWrapper, className)} style={{background: color}} {...other}>
      <img className={classes.validIcon} src={valid} alt="valider" />
    </div>
  );
};
export default Valid;
