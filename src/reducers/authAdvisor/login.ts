import createRedux from '../../utils/createRedux';

// types
import { AnyAction } from 'redux';
import { ApiReducer } from 'reducers';

const INITIAL_STATE: ApiReducer = {
  fetching: false,
  error: '',
};

const loginAdvisorRequest = (state: ApiReducer) => ({ ...state, fetching: true, error: '' });

const loginAdvisorSuccess = (state: ApiReducer) => ({ ...state, fetching: false });

const loginAdvisorFailure = (state: ApiReducer, { error }: AnyAction) => ({ ...state, error, fetching: false });

const logoutAdvisor = (state: ApiReducer) => state;

const { actions, types: loginTypes, reducer } = createRedux(INITIAL_STATE, {
  loginAdvisorRequest,
  loginAdvisorSuccess,
  loginAdvisorFailure,
  logoutAdvisor,
});

export default actions;
export { loginTypes, reducer };
