import React from 'react';
import classes from './card.module.scss';
import classNames from '../../../utils/classNames';
import MultiIcon from '../../icons/multiIcon/multiIcon';

interface Props
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  edit: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  close: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  selected?: boolean;
  addTheme?: boolean;
}

const Card = ({
 edit, close, className, selected, addTheme, children, ...rest
}: Props) => (
  <div {...rest} className={classNames(classes.container, className)}>
    {children}
    <div {...close} className={classNames(classes.delete)}>
      <MultiIcon type="remove" width="40" height="40" Iconcolor="#ff001f" />
    </div>
    <div {...edit} className={!selected ? classes.edit : classes.hideButton}>
      <MultiIcon type="edit" width="40" height="40" Iconcolor="#7992BF" />
    </div>
    <div {...edit} className={selected ? classes.editAdd : classes.hideButton}>
      <MultiIcon type="validate" width="40" height="40" Iconcolor="#ffc107" />
    </div>
  </div>
);

Card.defaultProps = {
  edit: {},
  close: {},
};

export default Card;
