import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, ApiReducer, IFamille } from 'reducers';
import listFamilleActions from '../../reducers/listFamille';
import { useDidMount } from '../../hooks';

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
  return (
    <div>
      {familles.map(famille => (
        <img key={famille._id} src={`data:${famille.resources[0].mimetype};base64, ${famille.resources[0].base64}`} />
      ))}
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
