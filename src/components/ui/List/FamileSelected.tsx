import React, { MouseEvent } from 'react';

import { IFamille } from 'reducers';
import Button from 'components_v3/button/button';
import classes from './famile.module.scss';

interface IProps {
  famile: {
    nom: string;
    _id: number;
    index: number;
    resources?: {
      base64: string;
      mimetype: string;
      name: string;
      _id: string;
    }[];
  };
  index: number;
  onDraging?: boolean;
  handleDeleteClick: (famille: IFamille) => void;
}

const FamileSelected = ({ famile, handleDeleteClick }: any) => {
  const clicKed = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    handleDeleteClick(famile);
  };
  // const FamilleTitle = famile.nom.replace(/\//g, '-');
  const substring = famile.nom.split('/');
  
  return (
    <div className={classes.container}>
      <div className={classes.description_container}>
        {substring.map((el: string) => (
          <span style={{ display: 'inherit' }}>{el}</span>
        ))}
      </div>
      <div className={classes.delete_container}>
        <button className={classes.delete} onClick={clicKed}>
          {/* <MultiIcon type="remove" width="20" height="20" Iconcolor="#ff001f" /> */}
          <Button title="x" color="red" className={classes.closeButton} />
        </button>
      </div>
    </div>
  );
};
export default FamileSelected;
