import React from 'react';

import classes from './loader.module.scss';

const Loader = () => (
  <div className={`fixed_fill flex_center ${classes.container}`}>
    <div className={classes.spinner_container}>
      <div className={classes.loader}>
        <div className={`${classes.inner} ${classes.one}`} />
        <div className={`${classes.inner} ${classes.two}`} />
        <div className={`${classes.inner} ${classes.three}`} />
      </div>
    </div>
    <span>Diagoriente</span>
  </div>
);

export default Loader;
