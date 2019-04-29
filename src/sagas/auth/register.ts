import { call, all, put } from 'redux-saga/effects';

import userActions from '../../reducers/authUser/user';
import registerActions from '../../reducers/authUser/register';

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
    response: string
  };
}

export default function* ({ email, password, firstName, lastName, institution, question }: IRegisterRequestAction) {
  try {
    // TODO change login api with register when it's ready
    const response: WrappedResponse<IUser> = yield call(wrapApiCall, RegisterUserRequest,{ email, password, firstName, lastName, institution, question });
    if (response.success) {
      yield all([put(userActions.userChange(response.data)), put(registerActions.registerUserSuccess())]);
    } else {
      yield put(registerActions.registerUserFailure({ error: response.message }));
    }
  } catch (e) {
    // TODO improve error message
    yield put(registerActions.registerUserFailure('error unknown'));

  }
}
