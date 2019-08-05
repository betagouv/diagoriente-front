import createRedux from '../utils/createRedux';

// types
import { AnyAction } from 'redux';
import { ApiReducer, IExpertise } from 'reducers';

const INITIAL_STATE: ApiReducer<IExpertise[]> = {
  fetching: false,
  error: '',
  data: [],
};

const expertisesRequest = (state: ApiReducer<IExpertise[]>) => ({ ...state, fetching: true, error: '' });

const expertisesSuccess = (state: ApiReducer<IExpertise[]>, { data }: AnyAction) => ({
  ...state,
  data,
  fetching: false,
});

const expertisesFailure = (state: ApiReducer<IExpertise[]>, { error }: AnyAction) => ({
  ...state,
  error,
  fetching: false,
});

const { actions, types: expertisesTypes, reducer } = createRedux(INITIAL_STATE, {
  expertisesRequest,
  expertisesSuccess,
  expertisesFailure,
});

export default actions;
export { expertisesTypes, reducer };
