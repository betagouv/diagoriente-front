import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import { loginTypes } from '../../reducers/authUser/login';
import loginRequest from './login';

import { registerTypes } from '../../reducers/authUser/register';
import registerRequest from './register';

export default function* () {
  yield all([
    takeLatest(loginTypes.loginUserRequest, loginRequest),
    takeLatest(registerTypes.registerUserRequest, registerRequest),
  ]);
}
