import { AnyAction } from 'redux';
import { ApiReducer, IActivity } from 'reducers';
import createRedux from '../utils/createRedux';

export const INITIAL_DATA: IActivity = {
  _id: '',
  title: '',
  type: '',
  description:'',
  verified: false,
  interests: [],
};

const INITIAL_STATE: ApiReducer<IActivity> = {
  fetching: false,
  error: '',
  data: INITIAL_DATA,
};

const getActivityRequest = (state: ApiReducer<IActivity>) => ({ ...state, fetching: true, error: '' });

const getActivitySuccess = (state: ApiReducer<IActivity>, { data }: AnyAction) => ({
  ...state,
  data,
  fetching: false,
});

const getActivityFailure = (state: ApiReducer<IActivity>, { error }: AnyAction) => ({
  ...state,
  error,
  fetching: false,
});

const { actions, types: getActivitTypes, reducer } = createRedux(INITIAL_STATE, {
  getActivityRequest,
  getActivitySuccess,
  getActivityFailure,
});

export default actions;
export { getActivitTypes, reducer };
