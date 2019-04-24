import { createSelector } from 'reselect';
import { ReduxState } from 'reducers';

const competenceSelector = (state: ReduxState, themeId: string) => state.parcours.competences[themeId];
const activitiesSelector = (state: ReduxState, themeId: string) => state.parcours.activities[themeId];

export const currentCompetenceSelector = createSelector(
  competenceSelector,
  competences => {
    return competences || [];
  },
);

export const currentActivitiesSelector = createSelector(
  activitiesSelector,
  activities => activities || [],
);
