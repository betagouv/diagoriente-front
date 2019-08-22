import {
 call, select, put, takeEvery, all,
} from 'redux-saga/effects';

import { ReduxState, IParcoursResponse } from 'reducers';
import currentParcoursActions, { currentParcoursTypes } from 'reducers/parcours';

import { updateParcoursCompetences, Response } from 'requests';

function* updateParcourCompetences({ type, ...data }: any) {
  try {
    const { parcours }: ReduxState = yield select();
    const response: Response<IParcoursResponse> = yield call(
      updateParcoursCompetences,
      parcours.data._id,
      data.competencesValue,
    );
    if (response.code === 200 && response.data) {
      yield put(currentParcoursActions.updateParcourSucess());

      yield all([
        put(currentParcoursActions.parcoursRequest()),
        put(currentParcoursActions.updateParcourSucess()),
      ]);
    } else {
      throw response.message;
    }
  } catch (e) {
    yield put(currentParcoursActions.updateParcourFailure({ error: e.data ? e.data.message : e }));

    console.log('failure');
  }
}

export default function* () {
  yield takeEvery(currentParcoursTypes.updateParcoursCompetences, updateParcourCompetences);
}
