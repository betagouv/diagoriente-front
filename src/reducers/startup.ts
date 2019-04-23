import createRedux from '../utils/createRedux';
import { Reducer } from 'redux';

const INITIAL_STATE: boolean = false;

const startup = () => false;
const startupEnd = () => true;

const { actions, types: startupTypes, reducer } = createRedux(INITIAL_STATE, { startup, startupEnd });

export default actions;
export { startupTypes, reducer };
