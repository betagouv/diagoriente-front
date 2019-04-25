import { call } from 'redux-saga/effects';
import { setItem } from '../../utils/localforage';
import { setAuthorizationBearer } from '../../requests';

export default function* () {
  try {
    yield call(setItem, 'user', null);
    setAuthorizationBearer(null);
  } catch (e) {
    setAuthorizationBearer(null);
  }
}
