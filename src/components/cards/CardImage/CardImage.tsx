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
  return (
    <div className={checked ? classes.containerSelected : classes.container}>
      {/*       <img src={staticCat} alt="cat" className={classes.static} />
       */}
      {resources && famille.resources && (
        <img
          src={`data:${resources[0].mimetype};base64, ${famille.resources[0].base64}`}
          alt="cat"
          className={classes.active}
        />
      )}
      <Button disabled={checked} checkedButon={checked} onClick={() => handleClick(famille)}>
        <img src={checked ? redLike : like} alt="heart" className={classes.heartImage} />
        <span className={classes.likeText}>j'aime</span>
      </Button>
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
