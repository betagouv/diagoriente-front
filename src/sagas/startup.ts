import { takeEvery } from 'redux-saga/effects';
import { startupTypes } from '../reducers/startup';

function* startup() {
  yield;
}

export default function* () {
  yield takeEvery(startupTypes.startup, startup);
}
