import { call, put, takeEvery } from 'redux-saga/effects';

import expertisesActions, { expertisesTypes } from 'reducers/expertises';

import { listCompetences, Response, ISkill } from 'requests';

function* skillsRequest() {
  try {
    const response: Response<ISkill[]> = yield call(listCompetences);
    if (response.code === 200 && response.data) {
      yield put(expertisesActions.expertisesSuccess({ data: response.data }));
    } else {
      throw response.message;
    }
  } catch (e) {
    yield put(expertisesActions.expertisesFailure({ error: e.data ? e.data.message : e }));
  }
}

export default function* () {
  yield takeEvery(expertisesTypes.expertisesRequest, skillsRequest);
}
