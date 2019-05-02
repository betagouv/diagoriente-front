import createRedux from '../utils/createRedux';
import { uniqBy } from 'lodash';

// types
import { AnyAction } from 'redux';
import { IParcours } from 'reducers';

const INITIAL_STATE: IParcours = {
  themes: [],
  activities: {},
  competences: {},
};

const add = <T extends { _id: string; [key: string]: any }>(table: T[], row: T) =>
  uniqBy([...table, row], ({ _id }) => _id);
const remove = <T extends { _id: string; [key: string]: any }>(table: T[], row: T) =>
  table.filter(item => item._id !== row._id);

const addTheme = (state: IParcours, { theme }: AnyAction) => ({ ...state, themes: add(state.themes, theme) });
const removeTheme = (state: IParcours, { theme }: AnyAction) => ({ ...state, themes: remove(state.themes, theme) });

const addActivity = (state: IParcours, { themeId, activity }: AnyAction) => {
  const current = state.activities[themeId] ? [...state.activities[themeId]] : [];
  return { ...state, activities: { ...state.activities, [themeId]: add(current, activity) } };
};

const removeActivity = (state: IParcours, { themeId, activity }: AnyAction) => {
  const current = state.activities[themeId] ? [...state.activities[themeId]] : [];
  return { ...state, activities: { ...state.activities, [themeId]: remove(current, activity) } };
};

const changeCompetence = (state: IParcours, { themeId, id, value }: AnyAction) => {
  const currentCompetence = state.competences[themeId] ? [...state.competences[themeId]] : [];
  const currentIndex = currentCompetence.findIndex(({ _id }) => _id === id);
  if (currentIndex !== -1) {
    currentCompetence[currentIndex] = { ...currentCompetence[currentIndex], value };
  } else {
    currentCompetence.push({ value, _id: id });
  }

  return { ...state, competences: { ...state.competences, [themeId]: currentCompetence } };
};

const { actions, types: parcoursTypes, reducer } = createRedux(INITIAL_STATE, {
  addTheme,
  removeTheme,
  addActivity,
  removeActivity,
  changeCompetence,
});

export default actions;
export { parcoursTypes, reducer };
