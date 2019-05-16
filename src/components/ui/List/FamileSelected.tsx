import React, { useState, MouseEvent } from 'react';

import classes from './famile.module.scss';
import { useHover } from '../../../hooks';
import classNames from '../../../utils/classNames';
interface IProps {
  famile: {
    nom: string;
    _id: number;
    index: number;
  };
  index: number;
  onDraging?: boolean;
}

const FamileSelected = ({ famile, index }: any) => {
  const [hover, onMouseOver, onMouseOut] = useHover(false);
  const [hoverBtn, onMouseOverBtn, onMouseOutBtn] = useHover(false);

  const deleteFamile = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('delete');
  };
  return (
    <div
      className={classNames(classes.container, hoverBtn && classes.deleteHover)}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOut}
    >
      <div className={classes.logo_container}>
        <div className={classes.logo_content}>
          <img
            className={classes.logo}
            src={`data:image/${famile.resources[0].mimetype};base64,${famile.resources[0].base64}`}
          />
        </div>
        <div className={classes.badge_container}>
          <div className={classes.badge}>{index + 1}</div>
        </div>
      </div>
      <div className={classes.description_container}>
        <span>{famile.nom}</span>
      </div>
      {hover && (
        <div className={classes.delete_container} onMouseEnter={onMouseOverBtn} onMouseLeave={onMouseOutBtn}>
          {hoverBtn ? (
            <button className={classes.delete} onClick={deleteFamile}>
              Je n’aime plus X
            </button>
          ) : (
            <button className={classes.delete} onClick={deleteFamile}>
              X
            </button>
          )}
        </div>
      )}
    </div>
  );
};
export default FamileSelected;
