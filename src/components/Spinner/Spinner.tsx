import React from 'react';

import classes from './spinner.module.scss';

const Spinner = () => {
  return (
    <div className={classes.spinner_container}>
      <div className={classes.spinner_content}>
        <div className={classes.triple_spinner} />
        <span className={classes.text_load}>
          Les 22 univers professionnels se chargent tu vas bientôt pouvoir en sélectionner 5
        </span>
      </div>
    </div>
  );
};
export default Spinner;
