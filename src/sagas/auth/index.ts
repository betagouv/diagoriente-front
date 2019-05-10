import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import { loginTypes } from '../../reducers/authUser/login';
import loginRequest from './login';
import logout from './logout';

import { registerTypes } from '../../reducers/authUser/register';
import registerRequest from './register';

import resetRequest from './resetPassword';
import { resetTypes } from '../../reducers/authUser/resetPassword';

import updateRequest from './updatePassword';
import { updateTypes } from '../../reducers/authUser/updatePassword';
export default function* () {
  yield all([
    takeLatest(loginTypes.loginUserRequest, loginRequest),
    takeLatest(loginTypes.logout, logout),

    takeLatest(registerTypes.registerUserRequest, registerRequest),

    takeLatest(resetTypes.resetRequest, resetRequest),
    takeLatest(updateTypes.updateRequest, updateRequest),

  ]);
}
