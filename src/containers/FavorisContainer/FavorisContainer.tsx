import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, ApiReducer, IFamille } from 'reducers';
import listFamilleActions from '../../reducers/listFamille';
import { useDidMount } from '../../hooks';
import classes from './favorisContainer.module.scss';
import Grid from '../../components/ui/Grid/Grid';
import Header from '../../layout/Header/Header';
import classNames from '../../utils/classNames';
import Info from '../../components/ui/Info/Info';
import Title from '../../components/Title/Title';
import PathStepper from '../../components/PathStepper/Path';

import CardImage from '../../components/cards/CardImage/CardImage';

interface IMapToProps {
  familles: IFamille[];
  fetching: boolean;
  error: string;
}

interface IMapDispatchToProps {
  famillesRequest: () => void;
}

interface Props extends IMapToProps, IMapDispatchToProps {}

const FavorisContainer = ({ famillesRequest, familles }: Props) => {
  useDidMount(() => {
    famillesRequest();
  });
  /*   return (
    <div>
      {familles.map(famille => (
        <img key={famille._id} src={`data:${famille.resources[0].mimetype};base64, ${famille.resources[0].base64}`} />
      ))}
    </div>
  ); */
  const stepperOptions = ['Commpléter mes informations'];
  console.log('famille', familles);
  const onNavigate = (index: number, p: string) => {
    if (index === 0) {
      /*       history.push('/profile');
       */
    }
    if (index === 1) {
      /*       history.push('/themes');
       */
    }
  };
  return (
    <div className={classes.container}>
      {/*  <Header /> */}

      <Grid container padding={{ xl: 0 }} spacing={{ xl: 20, lg: 20 }} className={classes.textContainer}>
        <Grid item xl={12}>
          <PathStepper options={stepperOptions} onClick={onNavigate} />
        </Grid>
        <Grid item xl={8} sm={8} smd={9} xs={6}>
          <div className={classes.text}>
            <Title title={'Lorem ipsum dolores'} />
          </div>

          <Info borderColor={'#F2F4F9'} backgroundColor={'#F2F4F9'}>
            Je précise mes expérience
          </Info>
        </Grid>
      </Grid>

      <Grid container padding={{ xl: 15, lg: 15 }} spacing={{ xl: 10, lg: 10 }} style={{ margin: '50px 0px' }}>
        <Grid item xl={9} lg={9} md={9} smd={9} sm={9} xs={9} className={'flex_center'}>
          <Grid item xl={12}>
            <Grid container spacing={{ xl: 0 }} padding={{ xl: 0 }}>
              {familles.map(famille => (
                <Grid key={famille._id} item xl={4} className={classes.cardContainer}>
                  <CardImage resources={famille.resources} />
                </Grid>
              ))}
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

const mapStateToProps = ({ listFamille }: ReduxState): IMapToProps => ({
  familles: listFamille.data,
  fetching: listFamille.fetching,
  error: listFamille.error,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IMapDispatchToProps => ({
  famillesRequest: () => dispatch(listFamilleActions.listFamilleRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavorisContainer);
