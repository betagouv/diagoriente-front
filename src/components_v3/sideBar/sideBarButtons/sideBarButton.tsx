import React, { useState } from 'react';
import classNames from '../../../utils/classNames';
import classes from './sideBarButton.module.scss';
import Logo from './sideBarLogo';
import Play from './sideBarLogoPlay';

export interface Props {
  title: string;
  logo?: 'play' | 'edit';
  background: string;
  color: string;
  hasIcon: boolean;
  background2: string;
}

const SideBarButton = ({
  className,
  title,
  logo,
  background,
  color,
  hasIcon,
  background2,
  ...other
}: Props & React.HTMLAttributes<HTMLElement>) => {
  const [clicked, setClik] = useState(false);

  const toggleClick = () => {
    setClik(!clicked);
  };

  return (
    <div className={classNames(className, classes.buttonContainer)}>
      <button
        className={clicked ? classes.buutonClicked : classes.buttonStyle}
        style={{ color, background: clicked ? background2 : background }}
        onClick={toggleClick}
      >
        {title}
        {hasIcon && (
          <div className={classes.logoContainer} style={{ borderColor: clicked ? background2 : background }}>
            {logo === 'edit' ? (
              <Logo color={clicked ? background2 : background} />
            ) : (
              <Play color={clicked ? background2 : background} />
            )}
          </div>
        )}
      </button>
    </div>
  );
};

export default SideBarButton;
