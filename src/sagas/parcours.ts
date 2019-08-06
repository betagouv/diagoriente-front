import {
 call, select, put, all, takeEvery,
} from 'redux-saga/effects';

import { ReduxState, IParcoursResponse } from 'reducers';
import currentParcoursActions, { currentParcoursTypes } from 'reducers/parcours';
import themesActions from 'reducers/themes';

import { updateParcours, Response } from 'requests';

function* currentParcoursRequest({ type, ...data }: any) {
  try {
    const { parcours }: ReduxState = yield select();
    const response: Response<IParcoursResponse> = yield call(
      updateParcours,
      parcours.data._id,
      data,
    );
    if (response.code === 200 && response.data) {
      yield all([
        put(themesActions.updateThemes({ themes: response.data.skills.map(({ theme }) => theme) })),
        put(currentParcoursActions.parcoursSuccess({ data: response.data })),
      ]);
    } else {
      throw response.message;
    }
  } catch (e) {
    yield put(currentParcoursActions.parcoursFailure({ error: e.data ? e.data.message : e }));
  }
}

export default function* () {
  yield takeEvery(currentParcoursTypes.parcoursRequest, currentParcoursRequest);
}
