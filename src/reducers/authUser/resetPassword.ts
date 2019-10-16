
// types
import { AnyAction } from 'redux';
import { ApiReducer, IRestResponse } from 'reducers';
import createRedux from '../../utils/createRedux';

const INITIAL_DATA: IRestResponse = {
  email: '',
  token: '',
};

const INITIAL_STATE: ApiReducer<IRestResponse> = {
  fetching: false,
  error: '',
  data: INITIAL_DATA,
};

const resetRequest = (state: ApiReducer<IRestResponse>) => ({
  ...state,
  fetching: true,
  error: '',
});

const resetSuccess = (state: ApiReducer<IRestResponse>, { data }: AnyAction) => ({
  ...state,
  data,
  fetching: false,
});

const resetFailure = (state: ApiReducer<IRestResponse>, { error }: AnyAction) => ({
  ...state,
  error,
  fetching: false,
});

const { actions, types: resetTypes, reducer } = createRedux(INITIAL_STATE, {
  resetRequest,
  resetSuccess,
  resetFailure,
});

export default actions;
export { resetTypes, reducer };
