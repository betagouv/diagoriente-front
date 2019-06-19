import { call, put, take, race } from 'redux-saga/effects';

import registerActions from '../../reducers/authUser/register';
import loginActions, { loginTypes } from '../../reducers/authUser/login';

import { wrapApiCall, registerUserRequest, WrappedResponse, IUser } from '../../requests';

interface IRegisterRequestAction {
  type: 'REGISTER_REQUEST';
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  question: {
    _id: string;
    response: string;
  };
}

export function* registerUser({ email, password, firstName, lastName, question }: IRegisterRequestAction) {
  try {
    const response: WrappedResponse<IUser> = yield call(wrapApiCall, registerUserRequest, {
      email,
      password,
      firstName,
      lastName,
      question,
    });
    if (response.success) {
      yield put(loginActions.loginUserRequest({ email, password }));
      const [success, failure] = yield race([take(loginTypes.loginUserSuccess), take(loginActions.loginUserFailure)]);
      if (success) {
        yield put(registerActions.registerUserSuccess());
      } else {
        yield put(registerActions.registerUserFailure({ error: failure.error }));
      }
    } else {
      yield put(registerActions.registerUserFailure({ error: response.message }));
    }
  } catch (e) {
    // TODO improve error message
    yield put(registerActions.registerUserFailure({ error: e }));
  }
}
