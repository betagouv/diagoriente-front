import React from 'react';
import classes from './competence.module.scss';
import CompetenceItem from '../../ui/CompetenceItem/CompetenceItem';
import arrow from '../../../assets/icons/arrow.png';

interface IProps {
  parcours: {
    title: string;
    value: number;
    _id: string;
    niveau: { title: string; sub_title?: string };
  }[];
  pdfDownload?: () => void;
}

const Competence = ({ parcours, pdfDownload }: IProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.title_container}>Carte de compétences</div>
      <CompetenceItem parcours={parcours} />
      <div className={classes.footer} onClick={pdfDownload}>
        Télécharger <img className={classes.arrow} src={arrow} />{' '}
      </div>
    </div>
  );
};
export default Competence;
