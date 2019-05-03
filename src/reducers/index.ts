import { combineReducers, Reducer } from 'redux';

import { reducer as startup } from './startup';
import { reducer as modal } from './modal';
import { reducer as authUser } from './authUser';
import { reducer as parcours } from './parcours';
import { reducer as currentParcours } from './currentParcours';

export default combineReducers({
  parcours,
  modal,
  authUser,
  currentParcours,
  startup: startup as Reducer<boolean>,
});
