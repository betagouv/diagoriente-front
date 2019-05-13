import { combineReducers } from 'redux';

import { reducer as advisor } from './advisor';
import { reducer as login } from './login';

export const reducer = combineReducers({
  advisor,
  login,
});
