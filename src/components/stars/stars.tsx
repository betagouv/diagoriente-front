import React from 'react';
import classes from './stars.module.scss';
import classNames from '../../utils/classNames';
import ReactTooltip from 'react-tooltip';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  checked: boolean;
  onChange(): void;
  type?: string;
}

const stars = ({ className, children, checked, onChange, title, type, ...other }: Props) => {
  return (
    <div data-for={title} {...other} data-tip={title} className={classNames(classes.container, className)}>
      <div
        /* className={!checked ? classes.star : type === 'professional' ? classes.star_checked_pro : classes.star_checked} */

        className={
          type === 'professional'
            ? !checked
              ? classes.star_pro
              : classes.star_checked_pro
            : !checked
            ? classes.star
            : classes.star_checked
        }
        onClick={onChange}
      />
      <ReactTooltip id={title} type="light" className={`tooltip ${classes.tooltip_star}`} />
    </div>
  );
};

export default stars;
