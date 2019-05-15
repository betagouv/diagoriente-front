import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

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
import List from '../../components/ui/List/List';
import CardImage from '../../components/cards/CardImage/CardImage';
// assets
import logo from '../../assets/icons/logo/diagoriente-logo-01.png';
import logo2x from '../../assets/icons/logo/diagoriente-logo-01@2x.png';
import logo3x from '../../assets/icons/logo/diagoriente-logo-01@3x.png';

interface IMapToProps {
  familles: IFamille[];
  fetching: boolean;
  error: string;
}

interface IMapDispatchToProps {
  famillesRequest: () => void;
}

interface Props extends IMapToProps, IMapDispatchToProps {}

const FavorisContainer = ({ famillesRequest, familles, history }: Props & RouteComponentProps) => {
  useDidMount(() => {
    famillesRequest();
  });
  const [items, setItems] = useState([
    { nom: 'Item 1', _id: 0, id: 0 },
    { nom: 'Item 2', _id: 1, id: 1 },
    { nom: 'Item 3', _id: 2, id: 2 },
  ]);

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
      history.push('/profile');
    }
    if (index === 1) {
      /*       history.push('/themes');
       */
    }
  };
  const onNavigateToHome = () => {
    history.push('/profile');
  };
  return (
    <div className={classes.container}>
      {/*  <Header /> */}
      <Grid container spacing={{ xl: 0 }} padding={{ xl: 0 }}>
        <Grid item xl={9}>
          <Grid container className={classes.textContainer} padding={{ xl: 40 }}>
            <Grid item xl={12}>
              <Grid container xl={12} padding={{ xl: 0 }}>
                <Grid item xl={4}>
                  <div className={classes.header}>
                    <div className={classes.logo_container} onClick={onNavigateToHome}>
                      <img src={logo} srcSet={`${logo2x} 2x, ${logo3x} 3x`} className={classes.logo} />{' '}
                    </div>
                  </div>
                </Grid>
                <Grid item xl={8}>
                  <PathStepper options={stepperOptions} onClick={onNavigate} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={12} sm={12} smd={12} xs={12}>
              <div className={classes.text}>
                <Title title={'Lorem ipsum dolores'} />
              </div>

              <Info borderColor={'#F2F4F9'} backgroundColor={'#F2F4F9'}>
                Je précise mes expérience
              </Info>
            </Grid>
          </Grid>
          <Grid container padding={{ xl: 15, lg: 15 }} spacing={{ xl: 9, lg: 9 }} style={{ margin: '50px 0px' }}>
            <Grid item xl={12} lg={12} md={12} smd={12} sm={12} xs={12} className={'flex_center'}>
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
          </Grid>
        </Grid>
        <Grid item xl={3} lg={3} md={3} smd={3} sm={3} xs={3} className={classes.item2}>
          <Grid container padding={{ xl: 0, md: 0 }}>
            <Grid item xl={12}>
              <div className={classes.text_container_selection}>
                <span className={classes.text_selection}>Ma séléction</span>
              </div>
              <List famileSelected={items} />
            </Grid>
          </Grid>
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
)(withRouter(FavorisContainer));
