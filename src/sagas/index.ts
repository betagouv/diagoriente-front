import { fork, all } from 'redux-saga/effects';

import authSaga from './auth';
import startup from './startup';
import currentParcours from './parcours';

const sagas = [startup, authSaga, currentParcours];

export default function* () {
  yield all(sagas.map(saga => fork(saga)));
}
