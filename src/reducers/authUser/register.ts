import { AnyAction } from 'redux';
import createRedux from '../../utils/createRedux';
import { ApiReducer } from 'reducers';

const INITIAL_STATE: ApiReducer = {
  fetching: false,
  error: '',
};

const registerUserRequest = (state: ApiReducer) => ({ ...state, fetching: true, error: '' });

const registerUserSuccess = (state: ApiReducer) => ({ ...state, fetching: false });

const registerUserFailure = (state: ApiReducer, { error }: AnyAction) => ({ ...state, fetching: false, error });

const { actions, types: registerTypes, reducer } = createRedux(INITIAL_STATE, {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
});

export default actions;
export { registerTypes, reducer };
