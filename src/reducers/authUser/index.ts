import { combineReducers } from 'redux';

import { reducer as user } from './user';
import { reducer as login } from './login';
import { reducer as register } from './register';

export const reducer = combineReducers({
  user,
  login,
  register,
});
