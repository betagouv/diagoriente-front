import React from 'react';
import classes from './homeCard.module.scss';
import classNames from '../../../utils/classNames';
import WithSub from '../Sub/Sub';
import Button from '../../buttons/RoundButton/RoundButton';
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
  const background = [
    'linear-gradient(257deg, #4e66ff, #00cfff)',
    'linear-gradient(257deg, #a422c9, #5065ff)',
    'linear-gradient(257deg, #ff009a, #a521c8)',
  ];
  const numberColor = ['#289BFF', '#7746E7', '#CF12B2'];
  console.log(background[cardNumber - 1]);
  return (
    <div className={classNames(className, classes.card)} {...other}>
      <div
        className={classes.imageContainer}
        style={{ backgroundImage: `${background[cardNumber - 1]}`, mixBlendMode: 'normal' }}
      >
        {/*         <img className={classes.image} />
         */}{' '}
      </div>
      <div className={classes.textContainer}>
        <span className={classNames(classes.subtitle)}>{subTitle}</span>
      </div>
      {/* <div className={classes.buttonContainer}>
        <Button>{buttonText}</Button>
      </div> */}
      <div className={classes.circleContainer}>
        <Circle className={classes.cardNumber} color={numberColor[cardNumber - 1]}>
          {cardNumber}
        </Circle>
      </div>
    </div>
  );
};

export default HomeCard;
