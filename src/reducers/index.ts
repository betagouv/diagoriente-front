import { combineReducers, Reducer } from 'redux';

import { reducer as startup } from './startup';
import { reducer as modal } from './modal';
import { reducer as authUser } from './authUser';
import { reducer as parcours } from './parcours';

export default combineReducers({
  parcours,
  modal,
  authUser,
  startup: startup as Reducer<boolean>,
});
