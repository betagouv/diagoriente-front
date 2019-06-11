import React from 'react';
import Transition from 'react-transition-group/Transition';

import classes from './drawer.module.scss';
import classNames from '../../../utils/classNames';
import { useHover } from '../../../hooks';

const Drawer = ({ className, component: Component, render }: any) => {
  const [open, onMouseEnter, onMouseLeave] = useHover(false);

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={classNames(classes.container, className)}>
      <Transition in={open} timeout={225}>
        {state => (
          <div className={classNames(classes.content, state === 'entered' && classes.content_open)}>
            {render ? render(state) : <Component state={state} />}
          </div>
        )}
      </Transition>
    </div>
  );
};

export default Drawer;
