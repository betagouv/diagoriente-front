import { all, takeLatest } from 'redux-saga/effects';

import { loginTypes as loginUserTypes } from 'reducers/authUser/login';
import { registerTypes } from 'reducers/authUser/register';
import { loginTypes as loginAdvisorTypes } from 'reducers/authAdvisor/login';
import { resetTypes } from 'reducers/authUser/resetPassword';
import { updateTypes } from 'reducers/authUser/updatePassword';

import resetRequest from 'sagas/auth/resetPassword';
import updateRequest from 'sagas/auth/updatePassword';
import { loginUser, loginAdvisor } from 'sagas/auth/login';
import { logoutUser, logoutAdvisor } from 'sagas/auth/logout';
import { registerUser } from 'sagas/auth/register';

export default function* () {
  yield all([
    takeLatest(resetTypes.resetRequest, resetRequest),
    takeLatest(updateTypes.updateRequest, updateRequest),
    takeLatest(loginUserTypes.loginUserRequest, loginUser),
    takeLatest(registerTypes.registerUserRequest, registerUser),
    takeLatest(loginUserTypes.logout, logoutUser),
    takeLatest(loginAdvisorTypes.loginAdvisorRequest, loginAdvisor),
    takeLatest(loginAdvisorTypes.logoutAdvisor, logoutAdvisor),
  ]);
}
