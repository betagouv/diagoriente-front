import { all, takeLatest } from 'redux-saga/effects';

import { loginTypes as loginUserTypes } from '../../reducers/authUser/login';
import { registerTypes } from '../../reducers/authUser/register';
import { loginTypes as loginAdvisorTypes } from '../../reducers/authAdvisor/login';

import resetRequest from './resetPassword';
import { resetTypes } from '../../reducers/authUser/resetPassword';

import updateRequest from './updatePassword';
import { updateTypes } from '../../reducers/authUser/updatePassword';
import { loginUser, loginAdvisor } from './login';
import { logoutUser, logoutAdvisor } from './logout';

import { registerUser } from './register';

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
