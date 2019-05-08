import { takeEvery, call, put, all } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import startupActions, { startupTypes } from '../reducers/startup';
import { getItem, setItem } from '../utils/localforage';
import { IUser, refreshToken, Response, setAuthorizationBearer, createParcours } from '../requests';
import { IToken, IParcoursResponse } from 'reducers';

import userActions from '../reducers/authUser/user';
import currentParcoursActions from '../reducers/parcours';
import themesActions from '../reducers/themes';

function* startup() {
  try {
    const user: IUser = yield call(getItem, 'user');
    if (!isEmpty(user)) {
      const response: Response<IToken> = yield call(refreshToken, {
        userId: user.user._id,
        refreshToken: user.token.refreshToken,
      });
      if (response.code === 200 && response.data) {
        const newUser = { user: user.user, token: response.data };
        setAuthorizationBearer(newUser.token.accessToken);
        const parcours: Response<IParcoursResponse> = yield call(createParcours, { userId: user.user._id });
        const fns = [call(setItem, 'user', newUser), put(userActions.userChange(newUser))];
        if (parcours.code === 200 && parcours.data) {
          fns.push(put(currentParcoursActions.parcoursSuccess({ data: parcours.data })));
          fns.push(put(themesActions.updateThemes({ themes: parcours.data.skills.map(({ theme }) => theme) })));
        }
        yield all(fns);
      }
    }
    yield put(startupActions.startupEnd());
  } catch (e) {
    yield put(startupActions.startupEnd());
  }
}

export default function* () {
  yield takeEvery(startupTypes.startup, startup);
}
