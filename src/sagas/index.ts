import { fork, all } from 'redux-saga/effects';

import authSaga from 'sagas/auth';
import startup from 'sagas/startup';
import currentParcours from 'sagas/parcours';
import listFamille from 'sagas/listFamille';
import activity from 'sagas/activity';
import expertises from 'sagas/expertises';
import updateParcourCompetences from 'sagas/GraduateCompetences';

const sagas = [
  startup,
  authSaga,
  currentParcours,
  listFamille,
  activity,
  expertises,
  updateParcourCompetences,
];

export default function* () {
  yield all(sagas.map(saga => fork(saga)));
}
