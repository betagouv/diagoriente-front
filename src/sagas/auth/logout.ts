import { call, put } from 'redux-saga/effects';
import userActions from 'reducers/authUser/user';
import advisorActions from 'reducers/authAdvisor/advisor';
import { setItem } from 'utils/localforage';
import { setAuthorizationBearer } from 'requests';

export function* logoutUser() {
  try {
    yield put(userActions.userReset());
    yield call(setItem, 'user', null);
    setAuthorizationBearer(null);
  } catch (e) {
    setAuthorizationBearer(null);
  }
}

export function* logoutAdvisor() {
  try {
    yield put(advisorActions.advisorChange({ advisor: {} }));
    yield call(setItem, 'advisor', null);
  } catch (e) {
    // do nothing
  }
}
