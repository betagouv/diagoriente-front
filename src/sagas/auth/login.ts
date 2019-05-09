import { call, all, put } from 'redux-saga/effects';

import userActions from '../../reducers/authUser/user';
import loginActions from '../../reducers/authUser/login';
import parcoursActions from '../../reducers/parcours';

import { IParcoursResponse } from 'reducers';
import {
  wrapApiCall,
  LoginUserRequest,
  WrappedResponse,
  IUser,
  setAuthorizationBearer,
  createParcours,
  Response,
} from '../../requests';
import { setItem } from '../../utils/localforage';

interface ILoginRequestAction {
  type: 'LOGIN_REQUEST';
  email: string;
  password: string;
}

export default function* ({ email, password }: ILoginRequestAction) {
  try {
    const response: WrappedResponse<IUser> = yield call(wrapApiCall, LoginUserRequest, { email, password });
    if (response.success) {
      setAuthorizationBearer(response.data.token.accessToken);
      const [parcours]: [Response<IParcoursResponse>] = yield all([
        call(createParcours, { userId: response.data.user._id }),
        call(setItem, 'user', response.data),
      ]);

      if (parcours.code < 400 && parcours.data) {
        yield all([
          put(loginActions.loginUserSuccess()),
          put(userActions.userChange({ user: response.data })),
          put(parcoursActions.parcoursSuccess({ data: parcours.data })),
        ]);
      } else {
        // TODO improve erreur message
        yield put(loginActions.loginUserFailure({ error: 'erreur inconnus' }));
      }
    } else {
      yield put(loginActions.loginUserFailure({ error: response.message }));
    }
  } catch (e) {
    // TODO improve erreur message
    yield put(loginActions.loginUserFailure({ error: 'erreur inconnus' }));
  }
}
