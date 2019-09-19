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
  console.log('title', title);

  return (
    <div className={classes.widgetContainer}>
      <div
        className="immersion-widget"
        data-metier={title || ''}
        data-lieu=""
        data-format="horizontal"
      />
    </div>
  );
};
export default EntrepriseForm;
