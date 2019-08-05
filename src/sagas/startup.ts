import { takeEvery, call, put, all } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import startupActions, { startupTypes } from '../reducers/startup';
import { getItem, setItem } from '../utils/localforage';
import { IUser, refreshToken, Response, setAuthorizationBearer, createParcours } from '../requests';
import { IToken, IParcoursResponse, Advisor } from 'reducers';

import userActions from '../reducers/authUser/user';
import advisorActions from '../reducers/authAdvisor/advisor';
import currentParcoursActions from '../reducers/parcours';
import themesActions from '../reducers/themes';
import expertisesActions from '../reducers/expertises';

function* startup() {
  try {
    const [user, advisor]: [IUser, Advisor | null] = yield all([call(getItem, 'user'), call(getItem, 'advisor')]);
    if (!isEmpty(user)) {
      const response: Response<IToken> = yield call(refreshToken, {
        userId: user.user._id,
        refreshToken: user.token.refreshToken,
      });
      if (response.code === 200 && response.data) {
        const newUser = { user: user.user, token: response.data };
        setAuthorizationBearer(newUser.token.accessToken);
        const parcours: Response<IParcoursResponse> = yield call(createParcours, {
          userId: user.user._id,
          advisorId: advisor && advisor.advisor ? advisor.advisor._id : undefined,
        });
        const fns = [
          call(setItem, 'user', newUser),
          put(userActions.userChange({ user: newUser })),
          put(advisorActions.advisorChange({ advisor: advisor || {} })),
          put(expertisesActions.expertisesRequest()),
        ];
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
