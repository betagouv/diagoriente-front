import createRedux from '../utils/createRedux';

// types
import { AnyAction } from 'redux';
import { ApiReducer, IParcoursResponse } from 'reducers';

export const INITIAL_DATA: IParcoursResponse = {
  completed: false,
  createdAt: '',
  families: [],
  skills: [],
  updatedAt: '',
  userId: '',
  _id: '',
};

const INITIAL_STATE: ApiReducer<IParcoursResponse> = {
  fetching: false,
  error: '',
  data: INITIAL_DATA,
};

const parcoursRequest = (state: ApiReducer<IParcoursResponse>) => ({ ...state, fetching: true, error: '' });

const parcoursSuccess = (state: ApiReducer<IParcoursResponse>, { data }: AnyAction) => ({
  ...state,
  data,
  fetching: false,
});

const parcoursFailure = (state: ApiReducer<IParcoursResponse>, { error }: AnyAction) => ({
  ...state,
  error,
  fetching: false,
});

const { actions, types: currentParcoursTypes, reducer } = createRedux(INITIAL_STATE, {
  parcoursRequest,
  parcoursSuccess,
  parcoursFailure,
});

export default actions;
export { currentParcoursTypes, reducer };
