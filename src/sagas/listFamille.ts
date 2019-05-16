import { takeLatest, call, all, put } from 'redux-saga/effects';

import listFamilleActions, { listFamilleTypes } from '../reducers/listFamille';
import {
  getListFamille,
  ListFamilleParams,
  wrapApiCall,
  FamilleList,
  getFamilleDetails,
  WrappedResponse,
  ListResponse,
  Response,
} from '../requests';
import { IFamille } from 'reducers';

function* listFamilleRequest({ payload }: { type: string; payload: ListFamilleParams }) {
  const list: WrappedResponse<ListResponse<FamilleList>> = yield call(wrapApiCall, getListFamille, payload);
  if (list.success) {
    yield put(
      listFamilleActions.listFamilleSuccess({
        data: list.data.data,
      }),
    );

    const promise = list.data.data.map(item => {
      return call(getFamilleDetails, item._id);
    });
    const results: Response<IFamille>[] = yield all(promise);
    const error = results.find(response => response && response.code !== 200);
    if (!error) {
      yield put(
        listFamilleActions.listFamilleSuccess({
          data: results.map(response => ({ resources: [{}], ...response.data })),
        }),
      );
    } else {
      yield put(listFamilleActions.listFamilleFailure({ error: error.message }));
    }
  } else {
    yield put(listFamilleActions.listFamilleFailure({ error: list.message }));
  }
}

export default function* () {
  yield takeLatest(listFamilleTypes.listFamilleRequest, listFamilleRequest);
}
