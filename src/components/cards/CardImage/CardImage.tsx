import React from 'react';
import classes from './CardImage.module.scss';
import cat2 from '../../../assets/images/cat2.gif';
import staticCat from '../../../assets/images/staticCat.png';
import Button from '../../buttons/LikeButton/LikeButton';
import like from '../../../assets/icons/svg/like.svg';
import redLike from '../../../assets/icons/svg/redLike.svg';

interface Props {
  checked?: boolean;
}

const CardImage = ({ className, children, checked, ...other }: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={checked ? classes.containerSelected : classes.container}>
      <img src={staticCat} alt="cat" className={classes.static} />

      <img src={cat2} alt="cat" className={classes.active} />
      <Button checkedButon={checked}>
        <img src={checked ? redLike : like} alt="heart" className={classes.heartImage} />
        <span className={classes.likeText}>j'aime</span>
      </Button>
    </div>
  );
};

export default CardImage;
