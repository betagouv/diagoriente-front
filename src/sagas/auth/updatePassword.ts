import { call, put, take, race } from 'redux-saga/effects';

import updateActions from '../../reducers/authUser/updatePassword';
import { getItem, setItem } from '../../utils/localforage';

import { wrapApiCall, UpdateRequest, WrappedResponse, IUser } from '../../requests';

interface updateAction {
  type: 'UPDATE_REQUEST';
  password: string;
  token: string;
}

export default function* ({ password }: updateAction) {
  const user: IUser = yield call(getItem, 'userToken');
  try {
    const response: WrappedResponse<IUser> = yield call(wrapApiCall, UpdateRequest, {
      password,
      token: user.token,
    });
    if (response.success) {
      yield put(updateActions.updateSuccess({ data: response.data }));
      yield put(updateActions.toggleUpdated());
    } else {
      yield put(updateActions.updateFailure({ error: response.errors }));
    }
  } catch (e) {
    // TODO improve error message
    yield put(updateActions.updateFailure({ error: e }));
  }
}
