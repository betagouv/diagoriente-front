import React, { useState } from 'react';
import classes from './CardImage.module.scss';
import cat2 from '../../../assets/images/cat2.gif';
import staticCat from '../../../assets/images/staticCat.png';
import Button from '../../buttons/LikeButton/LikeButton';
import like from '../../../assets/icons/svg/like.svg';
import redLike from '../../../assets/icons/svg/redLike.svg';
import cancel from '../../../assets/icons/cancel.png';
import { IFamille } from 'reducers';

interface Props {
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
  className,
  children,
  handleClick,
  id,
  resources,
  index,
  famille,
  checked,
  ...other
}: React.HTMLAttributes<HTMLElement> & Props) => {
  const [isMouseEnter, setMouseEnter] = useState(false as boolean);
  let animated;
  let Static;
  if (resources) {
    animated = resources.filter(ele => ele.mimetype !== 'image/gif')[0];
    Static = resources.filter(ele => ele.mimetype === 'image/gif')[0];
  }
  return (
    <div className={checked ? classes.containerSelected : classes.container}>
      {resources && famille.resources && resources.length > 1 && animated && (
        <img src={`data:${animated.mimetype};base64, ${animated.base64}`} alt="cat" className={classes.static} />
      )}

      {resources && famille.resources && resources.length === 1 ? (
        <img
          src={`data:${resources[0].mimetype};base64, ${famille.resources[0].base64}`}
          alt="cat"
          className={classes.active}
        />
      ) : resources && famille.resources && resources.length > 1 && Static ? (
        <img src={`data:${Static.mimetype};base64, ${Static.base64}`} alt="cat" className={classes.active} />
      ) : (
        <div className={classes.animated_background} />
      )}
      {resources && famille.resources && (
        <Button disabled={checked} checkedButon={checked} onClick={() => handleClick(famille)}>
          <img src={checked ? redLike : like} alt="heart" className={classes.heartImage} />
          <span className={classes.likeText}>j'aime</span>
        </Button>
      )}
      {checked && (
        <div
          className={classes.number}
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => setMouseEnter(false)}
        >
          {isMouseEnter ? (
            <div className={classes.dislikeContainer}>
              <span>je n'aime plus</span>

              <img
                src={cancel}
                alt={'x'}
                style={{ width: '12px', height: 12, lineHeight: '1.5' }}
                onClick={() => {
                  setMouseEnter(false);
                  handleClick(famille);
                }}
              />
            </div>
          ) : (
            index + 1
          )}
        </div>
      )}
    </div>
  );
};

export default CardImage;
