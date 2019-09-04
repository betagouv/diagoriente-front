import React, { useState } from 'react';
import withLayout from 'hoc/withLayout';
import arrow from 'assets_v3/icons/arrow/arrowFIlter.png';
import EntrepriseForm from 'components_v3/EntrepriseForm/EntrepriseForm';
import classNames from 'utils/classNames';
import classes from './mesdemarches.module.scss';

const MesDemarches = () => {
  const [isSelectionOpen, setSelectionOpen] = useState(true);
  const setSelectionToggle = () => {
    setSelectionOpen(!isSelectionOpen);
  };

  return (
    <div className={classes.selections}>
      <div className={classes.selection_title} onClick={setSelectionToggle}>
        <img
          src={arrow}
          alt="l"
          className={isSelectionOpen ? classes.arrowRoteted : classes.arrow}
        />

        <div>Filters</div>
      </div>
      <div
        className={classNames(
          isSelectionOpen ? classes.filter_containerOpen_child : classes.filter_container_child,
        )}
      >
        <EntrepriseForm />
      </div>
    </div>
  );
};
export default withLayout(MesDemarches);
