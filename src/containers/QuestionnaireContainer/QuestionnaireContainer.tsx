import React from 'react';
import classes from './questionnaire.module.scss';
import Grid from '../../components/ui/Grid/Grid';
import Header from '../../layout/Header/Header';
import classNames from '../../utils/classNames';
import CardImage from '../../components/cards/CardImage/CardImage';

const QuestionnaireContainer = () => {
  return (
    <div className={classes.container}>
      {/*  <Header /> */}
      <Grid container padding={{ xl: 0 }} spacing={{ xl: 20, lg: 20 }} className={classes.textContainer}>
        <Grid item xl={8} lg={8} className={classes.text}>
          <span>Title Title Title Title</span>
          <span>SubTitle SubTitle SubTitle SubTitle</span>
        </Grid>
      </Grid>

      <Grid container padding={{ xl: 15, lg: 15 }} spacing={{ xl: 10, lg: 10 }} style={{ margin: '50px 0px' }}>
        <Grid item xl={9} lg={9} md={9} smd={9} sm={9} xs={9} className={'flex_center'}>
          <Grid item xl={12}>
            <Grid container spacing={{ xl: 0 }} padding={{ xl: 0 }}>
              <Grid item xl={4} className={classes.cardContainer}>
                <CardImage checked />
              </Grid>
              <Grid item xl={4} className={classes.cardContainer}>
                <CardImage />
              </Grid>
              <Grid item xl={4} className={classes.cardContainer}>
                <CardImage />
              </Grid>

              <Grid item xl={4} lg={4} md={4} smd={4} sm={4} xs={4} className={classes.cardContainer}>
                <CardImage />
              </Grid>
              <Grid item xl={4} lg={4} md={4} smd={4} sm={4} xs={4} className={classes.cardContainer}>
                <CardImage />
              </Grid>
              <Grid item xl={4} lg={4} md={4} smd={4} sm={4} xs={4} className={classes.cardContainer}>
                <CardImage />
              </Grid>
              <Grid item xl={4} lg={4} md={4} smd={4} sm={4} xs={4} className={classes.cardContainer}>
                <CardImage />
              </Grid>

              <Grid item xl={4} lg={4} md={4} smd={4} sm={4} xs={4} className={classes.cardContainer}>
                <CardImage />
              </Grid>
              <Grid item xl={4} lg={4} md={4} smd={4} sm={4} xs={4} className={classes.cardContainer}>
                <CardImage />
              </Grid>
              <Grid item xl={4} lg={4} md={4} smd={4} sm={4} xs={4} className={classes.cardContainer}>
                <CardImage />
              </Grid>
              <Grid item xl={4} lg={4} md={4} smd={4} sm={4} xs={4} className={classes.cardContainer}>
                <CardImage />
              </Grid>

              <Grid item xl={4} lg={4} md={4} smd={4} sm={4} xs={4} className={classes.cardContainer}>
                <CardImage />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xl={3}
          lg={3}
          md={3}
          smd={3}
          sm={3}
          xs={3}
          className={classes.item2}
          style={{ backgroundColor: 'red' }}
        >
          <div>element 1</div>
          <div>element 2</div>
          <div>element 3</div>

          <div>element 4</div>
        </Grid>
      </Grid>
    </div>
  );
};
export default QuestionnaireContainer;
