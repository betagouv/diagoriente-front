import React, { useState, Fragment } from 'react';
import classes from './footer.module.scss';
import { gpi1x, gpi2x, gpi3x } from '../../assets/icons/logoGpi';
import { orange4x } from '../../assets/icons/logoOrange';
import {
 beta1x, beta2x, beta3x, beta4X,
} from '../../assets/icons/logobeta';
import Grid from '../../components/ui/Grid/Grid';
import { useListener } from '../../hooks/useListner';

const pdf = require('../../assets_v3/id6.pdf');

const Footer = () => {
  const [width, widthChange] = useState(window.innerWidth);
  useListener('resize', () => {
    widthChange(window.innerWidth);
  });

  function openPdf() {
    window.open(pdf);
  }

  const firstRowImages = (
    <Fragment>
      <img
        className={classes.logosContainer}
        src={gpi1x}
        srcSet={`${gpi2x} 2x, ${gpi3x} 3x `}
        alt="gpi"
      />
    </Fragment>
  );

  const secondRowImages = (
    <Fragment>
      <img className={classes.orange2} src={beta4X} alt="orange" />

      <img className={classes.beta} src={beta1x} srcSet={`${beta2x} 2x, ${beta3x} 3x`} alt="beta" />
      <img className={classes.orange} src={orange4x} alt="orange" />
    </Fragment>
  );

  const firstRow = width > 576 ? firstRowImages : <div className={classes.row}>{firstRowImages}</div>;
  const secondRow = width > 576 ? secondRowImages : <div className={classes.row}>{secondRowImages}</div>;

  return (
    <div className={classes.footerWrapper}>
      <Grid container className={classes.footerContainer} style={{ padding: '0px 11px' }}>
        <Grid className={classes.textFooter} item xl={4} lg={12}>
          DiagOriente une startup d’Etat de la DGEFP en partenariat avec
          <span onClick={openPdf} className={classes.link}>
            Id6
          </span>
          - DINUM Services du 1er Ministre
        </Grid>

        <Grid className={classes.images} item xl={8} lg={12}>
          {secondRow}
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
