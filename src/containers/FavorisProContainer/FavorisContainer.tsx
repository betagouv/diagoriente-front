import React, {
 useState, useEffect, Fragment, forwardRef, Ref, useRef,
} from 'react';
import { Carousel } from 'react-responsive-carousel';

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, IFamille } from 'reducers';
import { RouteComponentProps } from 'react-router-dom';

import withLayout from 'hoc/withLayout';

import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import listFamilleActions from '../../reducers/listFamille';
import parcoursActions from '../../reducers/parcours';
import { useDidMount, useDidUpdate, useCaptureRef } from '../../hooks';
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
import Button from 'components_v3/button/button';

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
interface RefProp {
  onFooterClick(button: string): void;
}
type Props = RouteComponentProps<{ id: string }> & IMapDispatchToProps & IMapToProps;

const FavorisContainer = forwardRef(
  (
    {
      famillesRequest,
      history,
      familles,
      fetching,
      updateParcoursRequest,
      prevFamily,
      parcoursFetching,
      parcoursError,
    }: Props,
    ref: Ref<RefProp>,
  ) => {
    const [selectedFamily, changeSelectedFamily] = useState([] as IFamille[]);
    const [DisplayedFamily, changeDisplayedFamily] = useState(0);
    const updatedFamille = useRef(false);

    useDidMount(() => {
      famillesRequest();
    });

    function onFooterClick(button: string) {
      if (button === 'valider') {
        const ids: string[] = selectedFamily.map(el => el._id);
        updateParcoursRequest({ families: ids });
        updatedFamille.current = false;
      }
    }
    useCaptureRef({ onFooterClick }, ref);

    useEffect(() => {
      if (familles.length !== 0 && prevFamily && !updatedFamille.current) {
        changeSelectedFamily(addPrevFamily(familles, prevFamily));
        updatedFamille.current = true;
      }
    }, [familles]);

    useDidUpdate(() => {
      if (!parcoursFetching && !parcoursError) {
        history.push('/profile/jobs');
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
    const deleteFamille = (id: number) => {
      const familleSelected = selectedFamily[id];
      let copySelected: IFamille[] = [...selectedFamily];
      if (isChecked(familleSelected._id)) {
        copySelected = selectedFamily.filter(ele => ele._id !== familleSelected._id);
      } else if (selectedFamily.length < 5) {
        copySelected.push(familleSelected);
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

    const flitredFamille = familles.filter((element: IFamille) => {
      if (element.resources) {
        return element.resources.length !== 0;
      }
      return false;
    });
    return (
      <div className={classes.container}>
        <div className={classes.underContainer}>
          <div className={classes.item2}>
            <div className={classes.sideBarWrapper}>
              <List
                famileSelected={selectedFamily}
                onDragEnd={onDragEnd}
                renderPlaceholder={renderPlaceholder}
                disable={selectedFamily.length}
                handleDeleteClick={id => deleteFamille(id)}
                fetching={parcoursFetching}
                fetchingFamille={fetching}
                renderAllPlaceholder={renderAllPlaceholder}
              />
            </div>
            <div className={classes.carouselContainer}>
            <div
              style={{ margin: '50px 0px' }}
            >
              <div className="flex_center">
                <div
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
                      <div
                        className="flex_center"
                        style={{
                          position: 'relative',
                          display: 'flex',
                          right: '1%',
                          top: '2%',
                          flexWrap: 'wrap',
                        }}
                      >
                        <VerticalStepper
                          handleClick={changeDisplayedFamily}
                          DisplayedFamily={DisplayedFamily}
                          selectedFamilys={selectedFamily}
                          listItems={flitredFamille}
                        />
                      </div>
                      <div className={classes.btnContainer}>
                        <Button
                          title=""
                          color="blue"
                          type="prev"
                          onClick={() => changeDisplayedFamily(DisplayedFamily - 1)}
                          className={classes.next}
                        />
                        <div>
                          <Button
                            title={
                              flitredFamille[DisplayedFamily] !== undefined
                                ? isChecked(flitredFamille[DisplayedFamily]._id)
                                  ? 'AJOUTÉ'
                                  : 'AJOUTER À MA SÉLECTION'
                                : ''
                            }
                            type={
                              flitredFamille[DisplayedFamily] !== undefined
                                ? isChecked(flitredFamille[DisplayedFamily]._id)
                                  ? 'checked'
                                  : undefined
                                : undefined
                            }
                            color="red"
                            onClick={handleClick}
                            style={
                              flitredFamille[DisplayedFamily] !== undefined
                                ? isChecked(flitredFamille[DisplayedFamily]._id)
                                  ? {
                                      height: 50,
                                      width: 180,
                                      background: '#ff80af',
                                      color: 'white',
                                      borderColor: '#ff80af'
                                    }
                                  : { height: 50, width: 180 }
                                : { height: 50, width: 180 }
                            }
                          />
                        </div>
                        <Button
                          title=""
                          type="next"
                          color="blue"
                          onClick={() => changeDisplayedFamily(DisplayedFamily + 1)}
                          className={classes.next}
                        />
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
          </div>
          
        </div>
      </div>
    );
  },
);

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
  null,
  { forwardRef: true },
)(withLayout(FavorisContainer));
