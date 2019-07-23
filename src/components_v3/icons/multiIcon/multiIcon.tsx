import React from 'react';
import classes from './multiIcon.module.scss';
import classNames from '../../../utils/classNames';
import validate from '../../../assets_v3/icons/validate/validate.svg';
import edit from '../../../assets_v3/icons/edit/settings.svg';
import remove from '../../../assets_v3/icons/delete/delete.svg';

interface Props {
  type: 'delete' | 'edit' | 'validate';
  withValidText: boolean;
}

const MultiIcon = ({ className, type, withValidText, ...other }: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={classNames(withValidText ? classes.validateContainer : classes.container, className)} {...other}>
      {withValidText && <span className={classes.text}>Valider</span>}
      <img
        className={withValidText ? classes.validIcon :  classes.multiIcon }
        src={type === 'delete' ? remove : type === 'edit' ? edit : type === 'validate' ? validate : ''}
        alt=""
      />
    </div>
  );
};

export default MultiIcon;
