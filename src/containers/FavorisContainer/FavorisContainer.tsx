import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ReduxState, ApiReducer, IFamille, Famille } from 'reducers';

import listFamilleActions from '../../reducers/listFamille';
import parcoursActions from '../../reducers/parcours';
import { useDidMount, useDidUpdate } from '../../hooks';
import classes from './favorisContainer.module.scss';
import Grid from '../../components/ui/Grid/Grid';
import Header from '../../layout/Header/Header';
import classNames from '../../utils/classNames';
import Info from '../../components/ui/Info/Info';
import Title from '../../components/Title/Title';
import PathStepper from '../../components/PathStepper/Path';
import List from '../../components/ui/List/List';
import CardImage from '../../components/cards/CardImage/CardImage';
import PlaceHolderFamile from '../../components/ui/List/PlaceHolderFamile';
import FamillePlaceholder from './FamillePlaceholder';
// assets
import logo from '../../assets/icons/logo/diagoriente-logo-01.png';
import logo2x from '../../assets/icons/logo/diagoriente-logo-01@2x.png';
import logo3x from '../../assets/icons/logo/diagoriente-logo-01@3x.png';
import { IUpdateParcoursParams } from '../../requests';
import addPrevFamily from '../../utils/addPrevFamille';
interface IMapToProps {
  familles: IFamille[];
  fetching: boolean;
  error: string;
  prevFamily: string[];
  parcoursFetching: boolean;
  parcoursError: string;
}

interface IMapDispatchToProps {
  famillesRequest: () => void;
  updateParcoursRequest: (payload: IUpdateParcoursParams) => void;
}

/* interface Props extends IMapToProps, IMapDispatchToProps, RouteComponentProps<{ id: string }> {}
 */

type Props = RouteComponentProps<{ id: string }> & IMapDispatchToProps & IMapToProps;
const FavorisContainer = ({
  famillesRequest,
  history,
  familles,
  fetching,
  updateParcoursRequest,
  prevFamily,
  parcoursFetching,
  parcoursError,
}: Props) => {
  const [selectedFamily, changeSelectedFamily] = useState([] as IFamille[]);

  useDidMount(() => {
    famillesRequest();
  });

  useEffect(() => {
    if (familles.length !== 0 && prevFamily) {
      changeSelectedFamily(addPrevFamily(familles, prevFamily));
    }
  },        [familles]);

  useDidUpdate(() => {
    if (!parcoursFetching && !parcoursError) {
      history.push('/jobs');
    }
  },           [parcoursFetching]);

  const stepperOptions = ['Compléter mes informations'];
  const onNavigate = (index: number, p: string) => {
    if (index === 0) {
      history.push('/profile');
    }
    if (index === 1) {
      history.push('/themes');
    }
  };
  const onNavigateToHome = () => {
    history.push('/profile');
  };
  const isChecked = (id: string): boolean => !!selectedFamily.find(elem => elem._id === id);

  const handleClick = (famille: IFamille) => {
    let copySelected: IFamille[] = [...selectedFamily];
    if (isChecked(famille._id)) {
      copySelected = selectedFamily.filter(ele => ele._id !== famille._id);
    } else {
      if (selectedFamily.length < 5) {
        copySelected.push(famille);
      }
    }

    changeSelectedFamily(copySelected);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const items: any = reorder(selectedFamily, result.source.index, result.destination.index);
    changeSelectedFamily(items);
  };
  const renderPlaceholder = () => {
    const array: JSX.Element[] = [];
    for (let i = selectedFamily.length + 1; i <= 5; i += 1) {
      array.push(<PlaceHolderFamile index={i} key={i} />);
    }
    return array;
  };
  const renderFamilePlaceholder = () => {
    for (let i = 0; i <= 15; i += 1) {}
  };
  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onSubmit = () => {
    const ids: string[] = selectedFamily.map(el => el._id);
    updateParcoursRequest({ families: ids });
  };
  return (
    <div className={classes.container}>
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
                  <PathStepper options={stepperOptions} onClick={onNavigate} type="type" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={12} sm={12} smd={12} xs={12}>
              <div className={classes.text}>
                <Title type="type" title={'Mes intérêts professionnels'} />
              </div>

              <Info borderColor={'#F2F4F9'} backgroundColor={'#F2F4F9'}>
                <span className={classes.text_info}>
                  Sélectionne par ordre de préférence jusqu’à 5 thèmes que tu te verrais exercer dans ton activité
                  professionnelle
                </span>
              </Info>
            </Grid>
          </Grid>
          <Grid container padding={{ xl: 15, lg: 15 }} spacing={{ xl: 9, lg: 9 }} style={{ margin: '50px 0px' }}>
            <Grid item xl={12} className={'flex_center'}>
              <Grid item xl={12}>
                {fetching ? (
                  <Grid container spacing={{ xl: 0 }} padding={{ xl: 0 }}>
                    <PlaceHolderFamile />
                  </Grid>
                ) : (
                  <Grid container spacing={{ xl: 0 }} padding={{ xl: 0 }}>
                    {familles.map(famille => (
                      <Grid key={famille._id} item xl={4} lg={6} smd={12} className={classes.cardContainer}>
                        <CardImage
                          resources={famille.resources}
                          handleClick={handleClick}
                          id={famille._id}
                          checked={isChecked(famille._id)}
                          index={selectedFamily.findIndex(elem => elem._id === famille._id)}
                          nom={famille.nom}
                          famille={famille}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={3} className={classes.item2}>
          <Grid container padding={{ xl: 0, md: 0 }}>
            <Grid item xl={12}>
              <div className={classes.text_container_selection}>
                <span className={classes.text_selection}>Ma séléction</span>
              </div>
              <List
                onSubmit={onSubmit}
                famileSelected={selectedFamily}
                onDragEnd={onDragEnd}
                renderPlaceholder={renderPlaceholder}
                disable={selectedFamily.length}
                handleDeleteClick={handleClick}
                fetching={parcoursFetching}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (State: ReduxState): IMapToProps => ({
  familles: State.listFamille.data,
  fetching: State.listFamille.fetching,
  error: State.listFamille.error,
  prevFamily: State.parcours.data.families,
  parcoursFetching: State.parcours.fetching,
  parcoursError: State.parcours.error,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IMapDispatchToProps => ({
  famillesRequest: () => dispatch(listFamilleActions.listFamilleRequest()),
  updateParcoursRequest: payload => dispatch(parcoursActions.parcoursRequest(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FavorisContainer));
