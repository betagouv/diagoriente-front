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
import WarningFooter from '../../../assets_v3/icons/validate/warningFotter.svg';

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
    | 'border';
  withText?: boolean;
  text?: string;
  width: string;
  height: string;
  left?: boolean;
  barré?: boolean;
  textColor?: string;
  Iconcolor?: string;
  bottom?: boolean;
  withBorder?: boolean;
  sideBar?: boolean;
  footer?: boolean;
  disabled?: boolean;
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
  bottom,
  withBorder,
  sideBar,
  footer,
  disabled,
  barré,
  ...other
}: React.HTMLAttributes<HTMLElement> & Props) => (
  <div
    className={classNames(
      withText
        ? left
          ? classes.containerleft
          : bottom
          ? classes.containerBottom
          : classes.validateContainer
        : classes.container,
      className,
    )}
    {...other}
  >
    {withText && (
      <span
        className={classNames(
          classes.text,
          bottom
            ? classes.textBottom
            : sideBar
            ? classes.textFont
            : footer
            ? classes.textFooter
            : '',
        )}
        style={{
          color: barré && type === 'validate' ? '#E55D67' : textColor,
          textDecoration: barré && type === 'validate' ? 'line-through' : 'none',
        }}
      >
        {text}
      </span>
    )}
    {barré && type === 'validate' && (
      <img src={WarningFooter} alt="warning" className={classes.warning} />
    )}
    {type === 'add' && !barré && <Add width={width} height={height} color={Iconcolor} />}
    {type === 'edit' && !barré && <Edit width={width} height={height} color={Iconcolor} />}
    {type === 'validate' && !barré && <Valid width={width} height={height} color={Iconcolor} />}
    {type === 'play' && !barré && <Play width={width} height={height} color={Iconcolor} />}
    {type === 'help' && <Help width={width} height={height} color={Iconcolor} />}
    {type === 'download' && !barré && <Download width={width} height={height} color={Iconcolor} />}
    {type === 'print' && !barré && <Print width={width} height={height} color={Iconcolor} />}
    {type === 'prev' && !barré && (
      <Prev width={width} height={height} color={Iconcolor} withBorder={withBorder} />
    )}
    {type === 'next' && !barré && (
      <Next width={width} height={height} color={Iconcolor} withBorder={withBorder} />
    )}
    {type === 'remove' && !barré && <Remove width={width} height={height} color={Iconcolor} />}
    {type === 'connect' && !barré && <Connect width={width} height={height} color={Iconcolor} />}
    {type === 'warning' && !barré && (
      <Warning width={width} height={height} color={Iconcolor} withBorder={withBorder} />
    )}
    {type === 'border' && !barré && <Border width={width} height={height} color={Iconcolor} />}
  </div>
);

export default MultiIcon;
