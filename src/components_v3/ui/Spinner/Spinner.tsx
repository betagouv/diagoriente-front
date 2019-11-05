import React from 'react';
import classes from './spinner.module.scss';

interface Props {
  size?: number;
  color?: string;
}

const Spinner = ({ size, color }: Props) => (
  <div style={{ height: size, width: size, borderTopColor: color }} className={classes.loading} />
);
export default Spinner;
