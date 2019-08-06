import { combineReducers, Reducer } from 'redux';
import { ReduxState } from 'reducers';

import { reducer as startup } from './startup';
import { reducer as modal } from './modal';
import { reducer as authUser } from './authUser';
import { reducer as authAdvisor } from './authAdvisor';
import { reducer as parcours } from './parcours';
import { reducer as themes } from './themes';
import { reducer as listFamille } from './listFamille';
import { reducer as activity } from './activity';
import { reducer as expertises } from './expertises';

const state = combineReducers<ReduxState>({
  parcours,
  modal,
  authUser,
  authAdvisor,
  themes,
  listFamille,
  activity,
  expertises,
  startup: startup as Reducer<boolean>,
});

export default state;
