import React, { useEffect } from 'react';
import Transition from 'react-transition-group/Transition';

import classes from './modal.module.scss';
import classNames from '../../../utils/classNames';

type Element = JSX.Element | false | string | null | undefined;

interface Props {
  open: boolean;
  children?: Element[] | Element;
  animationType?: string;
  backdropClassName?: string;
}

const Modal = ({ open, children, animationType = 'slide_bottom', backdropClassName }: Props) => {
  useEffect(() => {
    if (open) {
      (document.body as any).style = 'overflow:hidden;';
    } else {
      (document.body as any).style = undefined;
    }

    return () => {
      (document.body as any).style = undefined;
    };
  });
  return (
    <Transition in={open} mountOnEnter unmountOnExit timeout={225}>
      {state => {
        let dialogClassName = classNames(
          'flex_center',
          classes[animationType],
          classes.dialog,
          state === 'entered' && classes.dialog_show,
        );

        if (animationType === 'scale') {
          dialogClassName = classNames(
            'flex_center',
            classes.dialog,
            state === 'exiting' ? classes.scale_0 : classes.scale_1,
            state === 'exiting' ? classes.scale_close : classes.scale_open,
          );
        }

        return (
          <div className={classNames('fixed_fill', classes.modal_container)}>
            <div className={dialogClassName}>
              <div className={classes.content}>{children}</div>
            </div>
            <div
              className={classNames(
                'fixed_fill',
                classes.backdrop,
                (state === 'entered' || animationType === 'scale') && classes.backdrop_show,
                state === 'exiting' && classes.backdrop_hide,
                backdropClassName,
              )}
            />
          </div>
        );
      }}
    </Transition>
  );
};

export default Modal;
