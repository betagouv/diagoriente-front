import React from 'react';
import classes from './footer.module.scss';
import { national1x, national2x, national3x } from '../../assets/icons/logoNational';
import { gpi1x, gpi2x, gpi3x } from '../../assets/icons/logoGpi';
import { orange1x, orange2x, orange3x } from '../../assets/icons/logoOrange';
import { beta1x, beta2x, beta3x } from '../../assets/icons/logobeta';
import classNames from '../../utils/classNames';

const Footer = () => {
  return (
    <div className={classes.footerWrapper}>
      <div className={classNames(classes.footerContainer, 'container')}>
        <p className={classNames('item-4 item-xl-4 item-lg-3 item-md-12 item-sm-12 item-xs-12', classes.textFooter)}>
          Diagoriente est issue de la startup d’Etat Trouve ta voie est piloté par Id6 DINSIC - Services du 1er Ministre
          - Beta.gouv
        </p>
        <div className={classes.intermediate}></div>
        <div className={classNames(classes.logosContainer, 'item-4 item-xl-3 item-lg-4 item-md-12 item-sm-12 item-xs-12')}>
          <img src={gpi1x} srcSet={`${gpi2x} 2x, ${gpi3x} 3x `} alt="gpi" className={classes.gpi} />
          <img
            src={national1x}
            srcSet={`${national2x} 2x,${national3x} 3x `}
            alt="national"
            className={classes.national}
          />
          </div>
          <div className={classNames(classes.logosContainer, 'item-4 item-xl-3 item-lg-4 item-md-12 item-sm-12 item-xs-12')}>
          <img src={beta1x} srcSet={`${beta2x} 2x, ${beta3x} 3x`} alt="beta" className={classes.beta} />
          <img src={orange1x} srcSet={`${orange2x} 2x, ${orange3x} 3x`} alt="orange" className={classes.orange} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
