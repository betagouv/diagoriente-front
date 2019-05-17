import React from 'react';
import classes from './competence.module.scss';
import CompetenceItem from '../../ui/CompetenceItem/CompetenceItem';

interface IProps {
  parcours: {
    title: string;
    value: number;
    _id: string
  }[];
}

const Competence = ({ parcours }: IProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.title_container}>Carte de compétences</div>
      <CompetenceItem parcours={parcours} />
      <div className={classes.footer}>Voir en diagramme</div>
    </div>
  );
};
export default Competence;
