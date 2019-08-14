import React from 'react';
import classes from './CardHome.module.scss';

interface Props {
  icon: string;
  description: string;
}
const CardHome = ({ icon, description }: Props) => {
  return (
    <div className={classes.Container}>
      <img src={icon} alt={'icon'} className={classes.imag} />
      <span className={classes.description}>{description}</span>
    </div>
  );
};

export default CardHome;
