// types
import { AnyAction } from 'redux';
import { Advisor } from 'reducers';
import createRedux from '../../utils/createRedux';

const INITIAL_STATE: Advisor = {};

const advisorChange = (state: Advisor, { advisor }: AnyAction) => advisor;
const advisorReset = () => INITIAL_STATE;

const { actions, types: userTypes, reducer } = createRedux(INITIAL_STATE, {
  advisorChange,
  advisorReset,
});

export { reducer, userTypes };
export default actions;
