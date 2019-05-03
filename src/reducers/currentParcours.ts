import createRedux from '../utils/createRedux';

// types
import { AnyAction } from 'redux';
import { ApiReducer, ICurrentParcours } from 'reducers';

const INITIAL_DATA: ICurrentParcours = {
  completed: false,
  createdAt: '',
  families: [],
  skills: [],
  updatedAt: '',
  userId: '',
  _id: '',
};

const INITIAL_STATE: ApiReducer<ICurrentParcours> = {
  fetching: false,
  error: '',
  data: INITIAL_DATA,
};

const currentParcoursRequest = (state: ApiReducer<ICurrentParcours>) => ({ ...state, fetching: true, error: '' });

const currentParcoursSuccess = (state: ApiReducer<ICurrentParcours>, { data }: AnyAction) => ({
  ...state,
  data,
  fetching: false,
});

const currentParcoursFailure = (state: ApiReducer<ICurrentParcours>, { error }: AnyAction) => ({
  ...state,
  error,
  fetching: false,
});

const { actions, types: currentParcoursTypes, reducer } = createRedux(INITIAL_STATE, {
  currentParcoursRequest,
  currentParcoursSuccess,
  currentParcoursFailure,
});

export default actions;
export { currentParcoursTypes, reducer };
