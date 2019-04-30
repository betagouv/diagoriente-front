import { call, all, put } from 'redux-saga/effects';

import userActions from '../../reducers/authUser/user';
import registerActions from '../../reducers/authUser/register';

import { wrapApiCall, RegisterUserRequest, WrappedResponse, IUser, setAuthorizationBearer } from '../../requests';
import { setItem } from '../../utils/localforage';

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
      setAuthorizationBearer(response.data.token.accessToken);
      yield call(setItem, 'user', response.data);
      yield all([put(userActions.userChange(response.data)), put(registerActions.registerUserSuccess())]);
    } else {
      yield put(registerActions.registerUserFailure({ error: response.message }));
    }
  } catch (e) {
    // TODO improve error message
    yield put(registerActions.registerUserFailure({ error: e }));
  }
}
