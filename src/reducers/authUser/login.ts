import createRedux from '../../utils/createRedux';

// types
import { AnyAction } from 'redux';
import { ApiReducer } from 'reducers';

const INITIAL_STATE: ApiReducer = {
  fetching: false,
  error: '',
};

const loginUserRequest = (state: ApiReducer) => ({ ...state, fetching: true, error: '' });

const loginUserSuccess = (state: ApiReducer) => ({ ...state, fetching: false });

const loginUserFailure = (state: ApiReducer, { error }: AnyAction) => ({ ...state, error, fetching: false });

const logout = (state: ApiReducer) => state;

const { actions, types: loginTypes, reducer } = createRedux(INITIAL_STATE, {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  logout,
});

export default actions;
export { loginTypes, reducer };
