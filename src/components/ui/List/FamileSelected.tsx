import React, { useState, MouseEvent } from 'react';

import classes from './famile.module.scss';
import classNames from '../../../utils/classNames';
interface IProps {
  famile: {
    nom: string;
    _id: number;
  };
  index: number;
  onDraging?: boolean;
}

const FamileSelected = ({ famile, onDraging,index }: any) => {
  const [hover, setHover] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);
  const onMouseOver = (e: MouseEvent<HTMLElement>) => {
    setHover(true);
  };
  const onMouseOut = (e: MouseEvent<HTMLElement>) => {
    setHover(false);
  };
  const onMouseBtnOver = (e: MouseEvent<HTMLElement>) => {
    setHoverBtn(true);
  };
  const onMouseBtnOut = (e: MouseEvent<HTMLElement>) => {
    setHoverBtn(false);
  };
  const deleteFamile = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('delete');
  };

  return (
    <div
      className={classNames(classes.container)}
      onMouseEnter={e => onMouseOver(e)}
      onMouseLeave={e => onMouseOut(e)}
    >
      <div className={classes.logo_container}>
        <img className={classes.logo} />
        <div className={classes.badge_container}>
          <div className={classes.badge}>{index + 1}</div>
        </div>
      </div>
      <div className={classes.description_container}>
        <span>{famile.nom}</span>
      </div>
      {hover && (
        <div
          className={classes.delete_container}
          onMouseEnter={e => onMouseBtnOver(e)}
          onMouseLeave={e => onMouseBtnOut(e)}
        >
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
