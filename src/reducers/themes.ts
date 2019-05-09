import { AnyAction } from 'redux';
import { ITheme } from 'reducers';

import createRedux from '../utils/createRedux';
import { add, remove } from '../utils/helpers';

const INITIAL_STATE: ITheme[] = [];

const updateThemes = (state: ITheme[], { themes }: AnyAction) => themes;
const addTheme = (state: ITheme[], { theme }: AnyAction) => add(state, theme);
const removeTheme = (state: ITheme[], { theme }: AnyAction) => remove(state, theme);

const { actions, types: startupTypes, reducer } = createRedux(INITIAL_STATE, { addTheme, removeTheme, updateThemes });

export default actions;
export { startupTypes, reducer };
