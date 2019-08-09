import React, {
 useState, useEffect, Fragment,
} from 'react';
import { Carousel } from 'react-responsive-carousel';

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, IFamille } from 'reducers';
import { withRouter, RouteComponentProps } from 'react-router-dom';


import withLayout from 'hoc/withLayout';

import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import listFamilleActions from '../../reducers/listFamille';
import parcoursActions from '../../reducers/parcours';
import { useDidMount, useDidUpdate } from '../../hooks';
import classes from './favorisContainer.module.scss';
import Grid from '../../components/ui/Grid/Grid';
import List from '../../components/ui/List/List';
import CardImage from '../../components/cards/CardImage/CardImage';
import PlaceHolderFamile from '../../components/ui/List/PlaceHolderFamile';
import Spinner from '../../components/Spinner/Spinner';
import VerticalStepper from '../../components/VerticalStepper/VerticalStepper';
// assets
import { IUpdateParcoursParams } from '../../requests';
import addPrevFamily from '../../utils/addPrevFamille';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
  const [DisplayedFamily, changeDisplayedFamily] = useState(0);

  useDidMount(() => {
    famillesRequest();
  });

  useEffect(() => {
    if (familles.length !== 0 && prevFamily) {
      changeSelectedFamily(addPrevFamily(familles, prevFamily));
    }
  }, [familles]);

  useDidUpdate(() => {
    if (!parcoursFetching && !parcoursError) {
      history.push('/jobs');
    }
  }, [parcoursFetching]);
  const isChecked = (id: string): boolean => !!selectedFamily.find(elem => elem._id === id);

  const handleClick = () => {
    const famille = flitredFamille[DisplayedFamily];
    let copySelected: IFamille[] = [...selectedFamily];
    if (isChecked(famille._id)) {
      copySelected = selectedFamily.filter(ele => ele._id !== famille._id);
    } else if (selectedFamily.length < 5) {
      copySelected.push(famille);
    }

    changeSelectedFamily(copySelected);
  };
  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
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
  const renderAllPlaceholder = () => {
    const array: JSX.Element[] = [];
    for (let i = 1; i <= 5; i += 1) {
      array.push(<PlaceHolderFamile index={i} key={i} />);
    }
    return array;
  };

  const onSubmit = () => {
    const ids: string[] = selectedFamily.map(el => el._id);
    updateParcoursRequest({ families: ids });
  };

  const flitredFamille = familles.filter((element: IFamille) => {
    if (element.resources) {
      return element.resources.length !== 0;
    }
    return false;
  });
  return (
    <div className={classes.container}>
      <Grid
        container
        spacing={{ xl: 0 }}
        padding={{ xl: 0 }}
        style={{ flexDirection: 'row-reverse' }}
      >
        <Grid item xl={3} className={classes.item2}>
          <Grid item xl={12} className={classes.sideBarWrapper}>
            <List
              onSubmit={onSubmit}
              famileSelected={selectedFamily.filter((element: IFamille) => {
                if (element.resources) {
                  return element.resources.length !== 0;
                }
                return false;
              })}
              onDragEnd={onDragEnd}
              renderPlaceholder={renderPlaceholder}
              disable={selectedFamily.length}
              handleDeleteClick={handleClick}
              fetching={parcoursFetching}
              fetchingFamille={fetching}
              renderAllPlaceholder={renderAllPlaceholder}
            />
          </Grid>
        </Grid>
        <Grid item xl={9}>
          <Grid
            container
            padding={{ xl: 15, lg: 15 }}
            spacing={{ xl: 9, lg: 9 }}
            style={{ margin: '50px 0px' }}
          >
            <Grid item xl={11} className="flex_center">
              <Grid
                item
                xl={12}
                style={{
                  width: '90%',
                  margin: '0 auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                {fetching ? (
                  <div className={classes.container_loading}>
                    <Spinner />
                    <Carousel
                      showThumbs={false}
                      showIndicators={false}
                      showStatus={false}
                      selectedItem={DisplayedFamily}
                      onChange={index => changeDisplayedFamily(index)}
                      className={classes.carou}
                      width="97%"
                      stopOnHover={false}
                    >
                      <div className={classes.loaderImage} />
                    </Carousel>
                  </div>
                ) : (
                  <Fragment>
                    <Carousel
                      showThumbs={false}
                      showIndicators={false}
                      showStatus={false}
                      selectedItem={DisplayedFamily}
                      onChange={index => changeDisplayedFamily(index)}
                      className={classes.carou}
                      width="100%"
                      stopOnHover={false}
                      axis="vertical"
                      infiniteLoop
                      emulateTouch
                      showArrows={false}
                    >
                      {flitredFamille.map(famille => (
                        <CardImage
                          resources={famille.resources}
                          handleClick={handleClick}
                          id={famille._id}
                          checked={isChecked(famille._id)}
                          index={selectedFamily.findIndex(elem => elem._id === famille._id)}
                          nom={famille.nom}
                          famille={famille}
                        />
                      ))}
                    </Carousel>
                    <Grid
                      item
                      xl={1}
                      className="flex_center"
                      style={{
                        position: 'relative',
                        display: 'flex',
                        right: '1%',
                        top: '2%',
                        maxWidth: '30px',
                      }}
                    >
                      <VerticalStepper
                        handleClick={changeDisplayedFamily}
                        DisplayedFamily={DisplayedFamily}
                        selectedFamilys={selectedFamily}
                        listItems={flitredFamille}
                      />
                    </Grid>
                    <div className={classes.btnContainer}>
                      <MultiIcon
                        type="prev"
                        withText
                        left
                        text="PRÉCÉDENT"
                        width="15"
                        sideBar
                        height="15"
                        withBorder
                        onClick={() => changeDisplayedFamily(DisplayedFamily - 1)}
                      />
                      <div style={{ marginTop: 32 }}>
                        <MultiIcon
                          type="add"
                          withText
                          text={
                            flitredFamille[DisplayedFamily] !== undefined
                              ? isChecked(flitredFamille[DisplayedFamily]._id)
                                ? 'DÉSÉLECTIONNER'
                                : 'SÉLECTIONNER'
                              : ''
                          }
                          bottom
                          width="37"
                          sideBar
                          height="37"
                          withBorder
                          onClick={() => handleClick()}
                          textColor={
                            flitredFamille[DisplayedFamily] !== undefined
                              ? isChecked(flitredFamille[DisplayedFamily]._id)
                                ? '#ff0060'
                                : '#ffba27'
                              : 'gray'
                          }
                          Iconcolor={
                            flitredFamille[DisplayedFamily] !== undefined
                              ? isChecked(flitredFamille[DisplayedFamily]._id)
                                ? '#ff0060'
                                : '#ffba27'
                              : 'gray'
                          }
                        />
                      </div>

                      <MultiIcon
                        type="next"
                        withText
                        text="SUIVANT"
                        width="15"
                        sideBar
                        height="15"
                        withBorder
                        style={{ padding: 0 }}
                        onClick={() => changeDisplayedFamily(DisplayedFamily + 1)}
                      />
                    </div>
                  </Fragment>
                )}
                {/*   <button
                  className={classes.scrollNext}
                  onClick={() => changeDisplayedFamily(DisplayedFamily + 1)}
                >
                  <img src={scrollArrow} alt="next" style={{ width: '25px', height: '25px' }} />
                </button> */}
              </Grid>
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
)(withRouter(withLayout(FavorisContainer)));
