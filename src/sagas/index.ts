import { fork, all } from 'redux-saga/effects';

import authSaga from './auth';
import startup from './startup';

const sagas = [startup, authSaga];

export default function* () {
  yield all(sagas.map(saga => fork(saga)));
}
