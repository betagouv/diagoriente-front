import { combineReducers } from 'redux';

import { reducer as user } from './user';
import { reducer as login } from './login';
import { reducer as register } from './register';
import { reducer as resetPassword } from './resetPassword';
import { reducer as updatePassword } from './updatePassword';


export const reducer = combineReducers({
  user,
  login,
  register,
  resetPassword,
  updatePassword
});
