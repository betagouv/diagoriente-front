import React from 'react';
import classes from './homeCard.module.scss';
import classNames from '../../../utils/classNames';
import WithSub from '../Withsub/WithSub';
import Button from '../button/button';
import Circle from '../Circle/Circle';

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
}: React.HTMLAttributes<HTMLDivElement> & Props) => {
  return (
    <div className={classNames(className, classes.card)} {...other}>
      <div className={classes.imageContainer}>
        <img className={classes.image} />
      </div>
      <div className={classes.textContainer}>
        <span className={classNames(classes.subtitle)}>{subTitle}</span>
      </div>
      {/* <div className={classes.buttonContainer}>
        <Button>{buttonText}</Button>
      </div> */}
      <div className={classes.circleContainer}>
        <Circle className={classes.cardNumber}>{cardNumber}</Circle>
      </div>
    </div>
  );
};

export default HomeCard;
