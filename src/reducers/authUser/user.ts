import { AnyAction } from 'redux';
import createRedux from '../../utils/createRedux';
import { User } from 'reducers';

const INITIAL_STATE: User = {};

const userChange = (state: User, { type, ...user }: AnyAction) => user;
const userReset = () => INITIAL_STATE;

const { actions, types: userTypes, reducer } = createRedux(INITIAL_STATE, { userChange, userReset });

export { reducer, userTypes };
export default actions;
