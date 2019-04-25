import React from 'react';
import classes from './homeCard.module.scss';
import classNames from '../../../utils/classNames';
import WithSub from '../../ui/WithSub/WithSub';
import Button from '../../buttons/RoundButton/RoundButton';
import Circle from '../../ui/Circle/Circle';

interface Props {
  image: string;
  title: string;
  subTitle: string;
  buttonText: string;
  cardNumber: number;
}

const HomeCard = ({
  className,
  children,
  image,
  title,
  subTitle,
  buttonText,
  cardNumber,
  ...other
}: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={classNames(classes.card, className)} {...other}>
      <div className={classes.imageContainer}>
        <img src={image} className={classes.image} />
      </div>
      <div className={classes.textContainer}>
        <WithSub className={classes.withsub} title={title} subTitle={subTitle} />
      </div>
      <div className={classes.buttonContainer}>
        <Button>{buttonText}</Button>
      </div>
      <div className={classes.circleContainer}>
        <Circle className={classes.cardNumber}>{cardNumber}</Circle>
      </div>
    </div>
  );
};

export default HomeCard;
