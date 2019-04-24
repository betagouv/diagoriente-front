import { takeEvery, call, put } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import startupActions, { startupTypes } from '../reducers/startup';
import { getItem, setItem } from '../utils/localforage';
import { IUser, refreshToken, Response, setAuthorizationBearer } from '../requests';
import { IToken } from 'reducers';
import userActions from '../reducers/authUser/user';

function* startup() {
  try {
    const user: IUser = yield call(getItem, 'token');
    if (!isEmpty(user)) {
      const response: Response<IToken> = yield call(refreshToken, {
        userId: user.user._id,
        refreshToken: user.token.refreshToken,
      });
      if (response.code === 200 && response.data) {
        const newUser = { user: user.user, token: response.data };
        setAuthorizationBearer(newUser.token.accessToken);
        yield call(setItem, 'token', newUser);
        yield put(userActions.userChange(newUser));
      }
    }
    yield put(startupActions.startupEnd());
  } catch (e) {
    yield put(startupActions.startupEnd());
  }
}

export default function* () {
  yield takeEvery(startupTypes.startup, startup);
}
