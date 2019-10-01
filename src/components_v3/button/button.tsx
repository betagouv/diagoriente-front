import React, { useState, useEffect } from 'react';
import next from 'assets_v3/icons/arrow/Picto_FlecheDroite.svg';
import nextWhite from 'assets_v3/icons/arrow/Picto_FlecheDroite_white.svg';
import prev from 'assets_v3/icons/arrow/Picto_FlecheGauche.svg';
import prevWhite from 'assets_v3/icons/arrow/Picto_FlecheGauche_white.svg';
import checked from 'assets_v3/icons/arrow/Picto_InteretAjouté.svg';
import classes from './button.module.scss';
import classNames from '../../utils/classNames';
import { useDidMount } from 'hooks';

interface Props {
  title: string;
  color: 'red' | 'blue' | 'darkblueFilled' | 'redFilled' | 'liteRed'| 'blueFilled';
  type?: 'next' | 'prev' | 'checked';
}

const Button = ({
  title,
  color,
  className,
  type,
  ...other
}: Props & React.HTMLAttributes<HTMLButtonElement>) => {
  const [src, setSrc] = useState('');
  useEffect(() => {
    if (type === 'next') {
      setSrc(next);
    } else if (type === 'prev') {
      setSrc(prev);
    } else if (type === 'checked') {
      setSrc(checked);
    }
  });
  const setHover = () => {
    if (type === 'next') {
      setSrc(nextWhite);
    } else if (type === 'prev') {
      setSrc(prevWhite);
    }
  };

  return (
    <button
      className={classNames(
        color === 'red'
          ? classes.buttonRed
          : color === 'blue'
          ? classes.buttonBlue
          : color === 'darkblueFilled'
          ? classes.buttonDarkBlueFilled
          : color === 'liteRed'
          ? classes.buttonLiteRed
          :color === "blueFilled" ? classes.blueFilled 
          : classes.ButtonRedFilled,
        className,
      )}
      onMouseOver={setHover}
      onFocus={setHover}
      {...other}
    >
      <span>{title}</span>
      {type && <img src={src} alt="icon" className={classes.icon} />}
    </button>
  );
};
export default Button;
