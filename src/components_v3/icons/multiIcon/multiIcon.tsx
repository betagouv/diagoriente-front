import React from 'react';
import classes from './multiIcon.module.scss';
import classNames from '../../../utils/classNames';
import Add from './types/add';
import Edit from './types/Edit';
import Valid from './types/valid';
import Play from './types/play';
import Help from './types/help';
import Download from './types/download';
import Print from './types/print';
import Next from './types/next';
import Prev from './types/prev';
import Remove from './types/remove';
import Connect from './types/connect';
import Warning from './types/danger';
import Border from './types/border';

interface Props {
  type:
    | 'add'
    | 'edit'
    | 'validate'
    | 'play'
    | 'help'
    | 'download'
    | 'print'
    | 'prev'
    | 'next'
    | 'remove'
    | 'connect'
    | 'warning'
    |'border';
  withText?: boolean;
  text?: string;
  width: string;
  height: string;
  left?: boolean;
  textColor?: string;
  Iconcolor?: string;
  bottom?: boolean;
}

const MultiIcon = ({
  className,
  type,
  withText,
  text,
  width,
  height,
  left,
  textColor,
  Iconcolor,
  ...other
}: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div
      className={classNames(
        withText ? (left ? classes.containerleft : classes.validateContainer) : classes.container,
        className,
      )}
      {...other}
    >
      {withText && (
        <span className={classes.text} style={{ color: textColor }}>
          {text}
        </span>
      )}
      {type === 'add' && <Add width={width} height={height} color={Iconcolor} />}
      {type === 'edit' && <Edit width={width} height={height} color={Iconcolor} />}
      {type === 'validate' && <Valid width={width} height={height} color={Iconcolor} />}
      {type === 'play' && <Play width={width} height={height} color={Iconcolor} />}
      {type === 'help' && <Help width={width} height={height} color={Iconcolor} />}
      {type === 'download' && <Download width={width} height={height} color={Iconcolor} />}
      {type === 'print' && <Print width={width} height={height} color={Iconcolor} />}
      {type === 'prev' && <Prev width={width} height={height} color={Iconcolor} />}
      {type === 'next' && <Next width={width} height={height} color={Iconcolor} />}
      {type === 'remove' && <Remove width={width} height={height} color={Iconcolor} />}
      {type === 'connect' && <Connect width={width} height={height} color={Iconcolor} />}
      {type === 'warning' && <Warning width={width} height={height} color={Iconcolor} />}
      {type === 'border' && <Border width={width} height={height} color={Iconcolor} />}
    </div>
  );
};

export default MultiIcon;
