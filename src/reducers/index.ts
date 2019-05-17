import { combineReducers, Reducer } from 'redux';

import { reducer as startup } from './startup';
import { reducer as modal } from './modal';
import { reducer as authUser } from './authUser';
import { reducer as authAdvisor } from './authAdvisor';
import { reducer as parcours } from './parcours';
import { reducer as themes } from './themes';
import { reducer as listFamille } from './listFamille';
import { reducer as activity } from './activity';
export default combineReducers({
  parcours,
  modal,
  authUser,
  authAdvisor,
  themes,
  listFamille,
  activity,
  startup: startup as Reducer<boolean>,
});
