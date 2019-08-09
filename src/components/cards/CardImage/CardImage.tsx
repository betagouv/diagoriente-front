import React, { useState } from 'react';
import { IFamille } from 'reducers';
import classes from './CardImage.module.scss';
import cat2 from '../../../assets/images/cat2.gif';
import staticCat from '../../../assets/images/staticCat.png';
import Button from '../../buttons/LikeButton/LikeButton';
import like from '../../../assets/icons/svg/like.svg';
import redLike from '../../../assets/icons/svg/redLike.svg';
import cancel from '../../../assets/icons/cancel.png';
import { useHover } from '../../../hooks';

interface Props {
  /*   ref?: (ref: React.RefObject<HTMLDivElement | null>) => void;
   */
  checked?: boolean;
  resources?: {
    base64: string;
    mimetype: string;
    name: string;
    _id: string;
  }[];
  handleClick: (famille: IFamille) => void;
  id: string;
  nom: string;
  index: number;
  famille: IFamille;
}

const CardImage = ({
 handleClick, resources, index, famille, checked, nom,
}: Props) => {
  const [isMouseEnter, onMouseEnter, onMouseLeave] = useHover(false);
  let animated;
  let Static;

  const onClick = () => {
    handleClick(famille);
  };

  const getClassNames = (): string => {
    if (checked && resources) {
      return classes.containerSelected;
    }
    if (resources && !checked) {
      return classes.container;
    }
    return classes.withoutImage;
  };
  if (resources) {
    animated = resources.filter(ele => ele.mimetype !== 'image/gif')[0];
    Static = resources.filter(ele => ele.mimetype === 'image/gif')[0];
  }
  return (
    <div className={getClassNames()}>
      {resources && resources.length > 1 && animated && (
        <img
          src={`data:${animated.mimetype};base64, ${animated.base64}`}
          alt="cat"
          id="static"
          className={animated ? classes.hideStatic : classes.static}
        />
      )}

      {resources ? (
        resources.length > 1 && Static ? (
          <img
            src={`data:${Static.mimetype};base64, ${Static.base64}`}
            alt="cat"
            className={classes.active}
          />
        ) : (
          <img
            src={`data:${resources[0].mimetype};base64, ${resources[0].base64}`}
            alt="cat"
            className={classes.active}
          />
        )
      ) : (
        <div className={classes.animated_background} />
      )}
    </div>
  );
};

export default CardImage;
