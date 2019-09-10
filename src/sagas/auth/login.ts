import {
 call, all, put, select,
} from 'redux-saga/effects';
import { IParcoursResponse, ReduxState } from 'reducers';
import userActions from 'reducers/authUser/user';
import loginActions from 'reducers/authUser/login';
import parcoursActions from 'reducers/parcours';
/* import { initializeTuto } from 'utils/localStorage';
 */
import loginAdvisorActions from 'reducers/authAdvisor/login';
import advisorActions from 'reducers/authAdvisor/advisor';
import expertiseActions from 'reducers/expertises';

import {
  wrapApiCall,
  loginUserRequest,
  WrappedResponse,
  IUser,
  setAuthorizationBearer,
  createParcours,
  Response,
  loginAdvisorRequest,
  listCompetences,
  ICompetence,
} from 'requests';

import { setItem } from 'utils/localforage';

interface ILoginRequestAction {
  type: string;
  email: string;
  password: string;
}

export function* loginUser({ email, password }: ILoginRequestAction) {
  try {
    const response: WrappedResponse<IUser> = yield call(wrapApiCall, loginUserRequest, {
      email,
      password,
    });
    if (response.success) {
      /*       initializeTuto(response.data.user._id);
       */

      localStorage.setItem('Tuto', JSON.stringify(response.data.user.tutorial));
      setAuthorizationBearer(response.data.token.accessToken);
      const { authAdvisor }: ReduxState = yield select();
      const [parcours, competences]: [
        Response<IParcoursResponse>,
        Response<ICompetence[]>,
      ] = yield all([
        call(createParcours, {
          userId: response.data.user._id,
          advisorId: authAdvisor.advisor.advisor ? authAdvisor.advisor.advisor._id : undefined,
        }),
        call(listCompetences),
        call(setItem, 'user', response.data),
      ]);

      if (parcours.code < 400 && parcours.data && competences.code < 400 && competences.data) {
        yield all([
          put(parcoursActions.parcoursSuccess({ data: parcours.data })),
          put(loginActions.loginUserSuccess()),
          put(userActions.userChange({ user: response.data })),
          put(expertiseActions.expertisesSuccess({ data: competences.data })),
        ]);
      } else {
        yield put(
          loginActions.loginUserFailure({
            error:
              "Erreur inconnue, vérifiez votre connexion Internet ou essayez d'actualiser la page.",
          }),
        );
      }
    } else {
      yield put(loginActions.loginUserFailure({ error: response.message }));
    }
  } catch (e) {
    yield put(
      loginActions.loginUserFailure({
        error:
          "Erreur inconnue, vérifiez votre connexion Internet ou essayez d'actualiser la page.",
      }),
    );
  }
}

export function* loginAdvisor({ email, password }: ILoginRequestAction) {
  try {
    const response: WrappedResponse<any> = yield call(wrapApiCall, loginAdvisorRequest, {
      email,
      password,
    });

    if (response.success) {
      yield all([
        call(setItem, 'advisor', response.data),
        put(advisorActions.advisorChange({ advisor: response.data })),
        put(loginAdvisorActions.loginAdvisorSuccess()),
      ]);
    } else {
      yield put(loginAdvisorActions.loginAdvisorFailure({ error: response.message }));
    }
  } catch (e) {
    yield put(loginAdvisorActions.loginAdvisorFailure({ error: 'erreur inconnus' }));
  }
}
