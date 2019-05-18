import { fork, all } from 'redux-saga/effects';

import authSaga from './auth';
import startup from './startup';
import currentParcours from './parcours';
import listFamille from './listFamille';
import activity from './activity';

const sagas = [startup, authSaga, currentParcours, listFamille, activity];

export default function* () {
  yield all(sagas.map(saga => fork(saga)));
}
