import React from 'react';

import { useDidMount } from 'hooks';

import { appendWidget } from 'utils/widget';
import classes from './entreprise.module.scss';

interface Iprops {
  title: string;
}

const EntrepriseForm = ({ title }: Iprops) => {
  useDidMount(() => {
    appendWidget();
  });
  return (
    <div className={classes.widgetContainer}>
      <div
        className="immersion-widget"
        data-metier="coiffure"
        data-lieu="nantes-44"
        data-format="horizontal"
      />
    </div>
  );
};
export default EntrepriseForm;
