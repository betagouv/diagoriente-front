import createRedux from '../utils/createRedux';

// types
import { AnyAction } from 'redux';
import { IParcours } from 'reducers';

const INITIAL_STATE: IParcours = {
  themes: [],
  activities: {},
  competences: {},
};

const add = (table: string[], row: string) => [...table, row];
const remove = (table: string[], row: string) => table.filter(item => item !== row);

const addTheme = (state: IParcours, { id }: AnyAction) => ({ ...state, themes: add(state.themes, id) });
const removeTheme = (state: IParcours, { id }: AnyAction) => ({ ...state, themes: remove(state.themes, id) });

const addActivity = (state: IParcours, { themeId, id }: AnyAction) => {
  const current = state.activities[themeId] ? [...state.activities[themeId]] : [];
  return { ...state, activities: { ...state.activities, [themeId]: add(current, id) } };
};

const removeActivity = (state: IParcours, { themeId, id }: AnyAction) => {
  const current = state.activities[themeId] ? [...state.activities[themeId]] : [];
  return { ...state, activities: { ...state.activities, [themeId]: remove(current, id) } };
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
