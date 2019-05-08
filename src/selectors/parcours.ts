import { createSelector } from 'reselect';
import { ReduxState, ISkillPopulated } from 'reducers';

const skillsSelector = (state: ReduxState) => state.parcours.data.skills;

export const currentThemeSelector = (themeId: string) =>
  createSelector(
    skillsSelector,
    skills => {
      return (
        skills.find(({ theme }) => theme._id === themeId) ||
        ({
          activities: [],
          theme: { resources: {} } as any,
          competences: [],
          type: 'personal',
          _id: '',
        } as ISkillPopulated)
      );
    },
  );
