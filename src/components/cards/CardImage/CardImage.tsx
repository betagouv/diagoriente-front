import React from 'react';
import classes from './CardImage.module.scss';
import cat2 from '../../../assets/images/cat2.gif';
import staticCat from '../../../assets/images/staticCat.png';
import Button from '../../buttons/LikeButton/LikeButton';
import like from '../../../assets/icons/svg/like.svg';
import redLike from '../../../assets/icons/svg/redLike.svg';

interface Props {
  checked?: boolean;
  resources: {
    base64: string;
    mimetype: string;
    name: string;
    _id: string;
  }[];
}

const CardImage = ({
  className,
  children,
  resources,
  checked,
  ...other
}: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={checked ? classes.containerSelected : classes.container}>
      {/*       <img src={staticCat} alt="cat" className={classes.static} />
       */}
      <img src={`data:${resources[0].mimetype};base64, ${resources[0].base64}`} alt="cat" className={classes.active} />
      <Button checkedButon={checked}>
        <img src={checked ? redLike : like} alt="heart" className={classes.heartImage} />
        <span className={classes.likeText}>j'aime</span>
      </Button>
    </div>
  );
};

export default CardImage;
