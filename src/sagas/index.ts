import { fork, all } from 'redux-saga/effects';

import authSaga from './auth';
import startup from './startup';
import currentParcours from './parcours';
import listFamille from './listFamille';

const sagas = [startup, authSaga, currentParcours, listFamille];

export default function* () {
  yield all(sagas.map(saga => fork(saga)));
}
