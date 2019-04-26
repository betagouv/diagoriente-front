import { call, put } from 'redux-saga/effects';
import userActions from '../../reducers/authUser/user';
import { setItem } from '../../utils/localforage';
import { setAuthorizationBearer } from '../../requests';

export default function* () {
  try {
    yield put(userActions.userReset());
    yield call(setItem, 'user', null);
    setAuthorizationBearer(null);
  } catch (e) {
    setAuthorizationBearer(null);
  }
}
