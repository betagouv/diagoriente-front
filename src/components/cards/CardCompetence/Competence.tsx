import React from 'react';
import classes from './competence.module.scss';
import CompetenceItem from '../../ui/CompetenceItem/CompetenceItem';

interface IProps {
  parcours: {
    title: string;
    value: number;
    _id: string
  }[];
  pdfDownload?: () => void;
}

const Competence = ({ parcours, pdfDownload }: IProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.title_container}>Carte de compétences</div>
      <CompetenceItem parcours={parcours} />
      <div className={classes.footer} onClick={pdfDownload}>Télécharger en PDF</div>
    </div>
  );
};
export default Competence;
