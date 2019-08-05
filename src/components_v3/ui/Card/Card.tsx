import React from 'react';
import classes from './card.module.scss';
import classNames from '../../../utils/classNames';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  edit: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  close: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

const Card = ({ edit, close, className, children, ...rest }: Props) => {
  return (
    <div {...rest} className={classNames(classes.container, className)}>
      {children}
      <div {...close} className={classNames(classes.delete, close.className)} />
      <div {...edit} className={classNames(classes.edit, edit.className)} />
    </div>
  );
};

Card.defaultProps = {
  edit: {},
  close: {},
};

export default Card;
