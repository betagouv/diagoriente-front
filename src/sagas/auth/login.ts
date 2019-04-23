import { call, all, put } from 'redux-saga/effects';

import userActions from '../../reducers/authUser/user';
import loginActions from '../../reducers/authUser/login';

import { wrapApiCall, LoginUserRequest, WrappedResponse, IUser, setAuthorizationBearer } from '../../requests';
import { setItem } from '../../utils/localforage';

interface loginRequestAction {
  type: 'LOGIN_REQUEST';
  email: string;
  password: string;
}

export default function* ({ email, password }: loginRequestAction) {
  try {
    const response: WrappedResponse<IUser> = yield call(wrapApiCall, LoginUserRequest, { email, password });
    if (response.success) {
      setAuthorizationBearer(response.data.token.accessToken);
      yield call(setItem, 'token', response.data);
      yield all([userActions.userChange(response.data), loginActions.loginUserSuccess()]);
    } else {
      yield put(loginActions.loginUserFailure(response.message));
    }
  } catch (e) {
    // TODO improve erreur message
    yield put(loginActions.loginUserFailure('erreur inconnus'));
  }
}
