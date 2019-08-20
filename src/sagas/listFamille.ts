import {
 takeLatest, call, all, put, select,
} from 'redux-saga/effects';

import { IFamille } from 'reducers';
import listFamilleActions, { listFamilleTypes } from 'reducers/listFamille';

import {
  getListFamille,
  ListFamilleParams,
  wrapApiCall,
  FamilleList,
  getFamilleDetails,
  WrappedResponse,
  ListResponse,
  Response,
} from 'requests';

function* listFamilleRequest({ payload }: { type: string; payload: ListFamilleParams }) {
  const list: WrappedResponse<ListResponse<FamilleList>> = yield call(
    wrapApiCall,
    getListFamille,
    payload,
  );
  if (list.success) {
    yield put(
      listFamilleActions.listFamilleSuccess({
        data: list.data.data,
      }),
    );
    const arrayList = [...list.data.data];
    const data: any[][] = [];
    const { length } = arrayList;
    let arrayBythree: any = [];
    arrayList.forEach((element: any, i) => {
      if (i === length - 1 || arrayBythree.length === 2) {
        data.push([...arrayBythree, element]);
        arrayBythree = [];
      } else {
        arrayBythree.push(element);
      }
    });
    for (let i = 0; i < data.length; i += 1) {
      const promise = yield all(data[i].map(itemChild => call(getFamilleDetails, itemChild._id)));
      const results: Response<IFamille>[] = yield all(promise as any);
      const error = results.find(response => response && response.code !== 200);
      if (!error) {
        const state = yield select();
        yield put(
          listFamilleActions.listResourcesSuccess({
            // eslint-disable-next-line
            data: state.listFamille.data.map((item: any, index: number) => {
              if (Math.floor(index / 3) === i) {
                return { resources: [{}], ...results[index % 3].data };
              }
              return item;
            }),
          }),
        );
      } else {
        yield put(listFamilleActions.listFamilleFailure({ error: error.message }));
      }
    }
  } else {
    yield put(listFamilleActions.listFamilleFailure({ error: list.message }));
  }
}

export default function* () {
  yield takeLatest(listFamilleTypes.listFamilleRequest, listFamilleRequest);
}
