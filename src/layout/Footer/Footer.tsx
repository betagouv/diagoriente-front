import React, { useState } from 'react';
import classes from './footer.module.scss';
import { national1x, national2x, national3x } from '../../assets/icons/logoNational';
import { gpi1x, gpi2x, gpi3x } from '../../assets/icons/logoGpi';
import { orange1x, orange2x, orange3x } from '../../assets/icons/logoOrange';
import { beta1x, beta2x, beta3x } from '../../assets/icons/logobeta';
import Grid from '../../components/ui/Grid/Grid';
import { useListener } from '../../hooks/useListner';

const Footer = () => {
  const [width, widthChange] = useState(window.innerWidth);
  useListener('resize', () => {
    widthChange(window.innerWidth);
  });

  const firstRowImages = (
    <>
      <img className={classes.logosContainer} src={gpi1x} srcSet={`${gpi2x} 2x, ${gpi3x} 3x `} alt="gpi" />
      <img className={classes.gpi} src={national1x} srcSet={`${national2x} 2x,${national3x} 3x `} alt="national" />
    </>
  );

  const secondRowImages = (
    <>
      <img className={classes.beta} src={beta1x} srcSet={`${beta2x} 2x, ${beta3x} 3x`} alt="beta" />
      <img className={classes.orange} src={orange1x} srcSet={`${orange2x} 2x, ${orange3x} 3x`} alt="orange" />
    </>
  );

  const firstRow = width > 576 ? firstRowImages : <div className={classes.row}>{firstRowImages}</div>;
  const secondRow = width > 576 ? secondRowImages : <div className={classes.row}>{secondRowImages}</div>;

  return (
    <div className={classes.footerWrapper}>
      <Grid container className={classes.footerContainer}>
        <Grid className={classes.textFooter} item xl={4} lg={12}>
          Diagoriente est une StartUp díEtat pilotÈe par Id6 et la DINSIC - Services du 1er Ministre - Beta.gouv
        </Grid>

        <Grid className={classes.images} item xl={8} lg={12}>
          {firstRow}
          {secondRow}
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
