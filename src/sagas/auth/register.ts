import { call, put, take, race } from 'redux-saga/effects';

import registerActions from '../../reducers/authUser/register';
import loginActions, { loginTypes } from '../../reducers/authUser/login';

import { wrapApiCall, RegisterUserRequest, WrappedResponse, IUser } from '../../requests';

interface IRegisterRequestAction {
  type: 'REGISTER_REQUEST';
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  institution: string;
  question: {
    _id: string;
    response: string;
  };
}

export default function* ({ email, password, firstName, lastName, institution, question }: IRegisterRequestAction) {
  try {
    const response: WrappedResponse<IUser> = yield call(wrapApiCall, RegisterUserRequest, {
      email,
      password,
      firstName,
      lastName,
      institution,
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
