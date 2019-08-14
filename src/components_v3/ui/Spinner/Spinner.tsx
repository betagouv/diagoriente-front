import React from 'react';
import classes from './spinner.module.scss';

const Spinner = () => (
  <div className={classes.lds_roller}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);
export default Spinner;
