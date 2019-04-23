import { call, all, put } from 'redux-saga/effects';

import userActions from '../../reducers/authUser/user';
import loginActions from '../../reducers/authUser/login';

import { wrapApiCall, LoginUserRequest, WrappedResponse, IUser } from '../../requests';

interface loginRequestAction {
  type: 'LOGIN_REQUEST';
  email: string;
  password: string;
}

export default function* ({ email, password }: loginRequestAction) {
  // TODO change login api with register when it's ready
  const response: WrappedResponse<IUser> = yield call(wrapApiCall, LoginUserRequest, { email, password });
  if (response.success) {
    yield all([userActions.userChange(response.data), loginActions.loginUserSuccess()]);
  } else {
    yield put(loginActions.loginUserFailure(response.message));
  }
}
