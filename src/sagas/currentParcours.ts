import { takeLatest, call, select } from 'redux-saga/effects';
import { ReduxState } from 'reducers';

import { currentParcoursTypes } from '../reducers/currentParcours';

import { updateParcours } from '../requests';

function* currentParcoursRequest({ skills }: any) {
  const { currentParcours }: ReduxState = yield select();
  /* const response = yield call(updateParcours, currentParcours.data._id, { skills });
  console.log(response); */
}

export default function* () {
  yield takeLatest(currentParcoursTypes.currentParcoursRequest, currentParcoursRequest);
}
