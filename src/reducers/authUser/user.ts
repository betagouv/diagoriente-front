// types
import { AnyAction } from 'redux';
import { User, IUser } from 'reducers';
import createRedux from '../../utils/createRedux';

const INITIAL_STATE: User = {};
const userUpdate = (state: User, { user }: AnyAction) => ({ user, token: state.token});
const userChange = (state: User, { user }: AnyAction) => user;
const userReset = () => INITIAL_STATE;

const { actions, types: userTypes, reducer } = createRedux(INITIAL_STATE, {
  userChange,
  userReset,
  userUpdate,
});

export { reducer, userTypes };
export default actions;
