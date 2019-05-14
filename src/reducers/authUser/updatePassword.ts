import createRedux from '../../utils/createRedux';

// types
import { AnyAction } from 'redux';
import { IAPiUpdate } from 'reducers';

const INITIAL_STATE: IAPiUpdate = {
  fetching: false,
  error: '',
  updated: false,
};

const updateRequest = (state: IAPiUpdate) => ({ ...state, fetching: true, error: '' });

const updateSuccess = (state: IAPiUpdate) => ({ ...state, updated: true, fetching: false });

const updateFailure = (state: IAPiUpdate, { error }: AnyAction) => ({
  ...state,
  error,
  fetching: false,
});
const toggleUpdated = (state: IAPiUpdate) => ({ ...state, updated: false });

const { actions, types: updateTypes, reducer } = createRedux(INITIAL_STATE, {
  updateRequest,
  updateSuccess,
  updateFailure,
  toggleUpdated,
});

export default actions;
export { updateTypes, reducer };
