import { call, put, takeEvery } from 'redux-saga/effects';

import getActivityActions, { getActivitTypes } from '../reducers/activity';

import { wrapApiCall, getActivity, WrappedResponse } from '../requests';
import { IActivity } from 'reducers';

interface IActivityRequestAction {
  type: 'Activity_REQUEST';
  id: string;
}

export function* Activity({ id }: IActivityRequestAction) {
  try {
    const response: WrappedResponse<IActivity> = yield call(wrapApiCall, getActivity, {
      id,
    });
    if (response) {
      yield put(getActivityActions.getActivitySuccess( response));
    } else {
      throw response;
    }
  } catch (e) {
    // TODO improve error message
    yield put(getActivityActions.getActivityFailure({ error: e }));
  }
}
export default function* () {
  yield takeEvery(getActivitTypes.getActivityRequest, Activity);
}
