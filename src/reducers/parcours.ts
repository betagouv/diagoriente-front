// types
import { AnyAction } from 'redux';
import { ApiReducer, IParcoursResponse } from 'reducers';
import createRedux from '../utils/createRedux';

export const INITIAL_DATA: IParcoursResponse = {
  completed: false,
  createdAt: '',
  families: [],
  skills: [],
  updatedAt: '',
  userId: '',
  _id: '',
  played: false,
};

const INITIAL_STATE: ApiReducer<IParcoursResponse> = {
  fetching: false,
  error: '',
  data: INITIAL_DATA,
};
interface CompetencesValue {
  _id: string;
  value: number;
}

interface updateparcoursParam {
  id: string;
  competencesValue: CompetencesValue[];
}
const parcoursRequest = (state: ApiReducer<IParcoursResponse>) => ({
  ...state,
  fetching: true,
  error: '',
});

const parcoursSuccess = (state: ApiReducer<IParcoursResponse>, { data }: AnyAction) => ({
  ...state,
  data,
  fetching: false,
});

const parcoursFailure = (state: ApiReducer<IParcoursResponse>, { error }: AnyAction) => ({
  ...state,
  error,
  fetching: false,
});
const updateParcoursCompetences = (state: ApiReducer<IParcoursResponse>, { data }: AnyAction) => ({
  ...state,
  error: '',
  fetching: true,
});
const updateParcourSucess = (state: ApiReducer<IParcoursResponse>) => ({
  ...state,
  error: 'no error',
  fetching: false,
});

const updateParcourFailure = (state: ApiReducer<IParcoursResponse>, { error }: AnyAction) => ({
  ...state,
  error,
  fetching: false,
});
const { actions, types: currentParcoursTypes, reducer } = createRedux(INITIAL_STATE, {
  parcoursRequest,
  parcoursSuccess,
  parcoursFailure,
  updateParcoursCompetences,
  updateParcourFailure,
  updateParcourSucess,
});

export default actions;
export { currentParcoursTypes, reducer };
