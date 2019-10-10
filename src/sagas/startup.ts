import {
 takeEvery, call, put, all, take,
} from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import userActions from 'reducers/authUser/user';
import advisorActions from 'reducers/authAdvisor/advisor';
import currentParcoursActions from 'reducers/parcours';
import themesActions from 'reducers/themes';
import expertisesActions from 'reducers/expertises';
import {
 IToken, IParcoursResponse, Advisor, IAdvisor,
} from 'reducers';
import startupActions, { startupTypes } from 'reducers/startup';

import {
 IUser, refreshToken, Response, setAuthorizationBearer, createParcours,
} from 'requests';

import { getItem, setItem } from 'utils/localforage';

function* startupUser(user: IUser, advisor: Advisor | null) {
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

        put(expertisesActions.expertisesRequest()),
      ];
      if (parcours.code === 200 && parcours.data) {
        fns.push(put(currentParcoursActions.parcoursSuccess({ data: parcours.data })));
        fns.push(
          put(
            themesActions.updateThemes({
              themes: parcours.data.skills.map(({ theme }) => theme),
            }),
          ),
        );
      }
      yield all(fns);
    }
  }
}
function* startupAdvisor(advisor: Advisor | null) {
  if (advisor && !isEmpty(advisor.advisor)) {
    if (advisor.advisor && advisor.token) {
      const response: Response<IToken> = yield call(refreshToken, {
        userId: advisor.advisor._id,
        refreshToken: advisor.token.refreshToken,
      });
      if (response.code === 200 && response.data) {
        const newAdvisor: Advisor = { advisor: advisor.advisor, token: response.data };
        const fns = [
          call(setItem, 'advisor', newAdvisor),
          put(advisorActions.advisorChange({ advisor: { ...newAdvisor } })),
        ];
        if (newAdvisor.token) {
          setAuthorizationBearer(response.data.accessToken);
        }
        yield all(fns);
      }
    }
  }
}
function* startup() {
  try {
    const [user, advisor]: [IUser, Advisor | null] = yield all([
      call(getItem, 'user'),
      call(getItem, 'advisor'),
    ]);
    yield all([call(startupUser, user, advisor), call(startupAdvisor, advisor)]);

    yield put(startupActions.startupEnd());
  } catch (e) {
    console.log({ e });
    yield put(startupActions.startupEnd());
  }
}

export default function* () {
  yield takeEvery(startupTypes.startup, startup);
}
