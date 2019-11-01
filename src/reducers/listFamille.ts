import { AnyAction } from 'redux';
import { ApiReducer, IFamille } from 'reducers';
import createRedux from '../utils/createRedux';

const INITIAL_STATE: ApiReducer<IFamille[]> = {
  fetching: false,
  error: '',
  data: [],
};

const listFamilleRequest = (state: ApiReducer<IFamille[]>) => ({
  ...state,
  fetching: true,

  error: '',
});

const listFamilleSuccess = (state: ApiReducer<IFamille[]>, { data }: AnyAction) => ({
  ...state,
  data,
});
const listResourcesSuccess = (state: ApiReducer<IFamille[]>, { data }: AnyAction) => ({
  ...state,
  data,
  fetching: false,
});
const listFamilleFailure = (state: ApiReducer<IFamille[]>, { error }: AnyAction) => ({
  ...state,
  error,
});

const { actions, types: listFamilleTypes, reducer } = createRedux(INITIAL_STATE, {
  listFamilleRequest,
  listFamilleSuccess,
  listResourcesSuccess,
  listFamilleFailure,
});

export default actions;
export { listFamilleTypes, reducer };
