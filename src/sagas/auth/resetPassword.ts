import { call, put, take, race } from 'redux-saga/effects';

import resetActions from '../../reducers/authUser/resetPassword';

import { wrapApiCall, ResetRequest, WrappedResponse,setAuthorizationBearer, IUser } from '../../requests';
import { getItem, setItem } from '../../utils/localforage';

interface resetAction {
  type: 'RESET_REQUEST';
  email: string;
  question: {
    _id: string;
    response: string;
  };
}

export default function* ({ email, question }: resetAction) {
  try {
    const response: WrappedResponse<IUser> = yield call(wrapApiCall, ResetRequest, {
      email,
      question,
    });
    if (response.success) {
      const newUser = {token: response.data.token };
      setAuthorizationBearer(newUser.token.accessToken);
      yield call(setItem, 'userToken', newUser)
      yield put(resetActions.resetSuccess({ data: response.data }));
   


    } else {
      yield put(resetActions.resetFailure({ error: response.errors }));
    }
  } catch (e) {
    // TODO improve error message
    yield put(resetActions.resetFailure({ error: e }));
  }
}
