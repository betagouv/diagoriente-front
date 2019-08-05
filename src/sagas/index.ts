import { fork, all } from 'redux-saga/effects';

import authSaga from './auth';
import startup from './startup';
import currentParcours from './parcours';
import listFamille from './listFamille';
import activity from './activity';
import expertises from './expertises';

const sagas = [startup, authSaga, currentParcours, listFamille, activity, expertises];

export default function* () {
  yield all(sagas.map(saga => fork(saga)));
}
