import { isEmpty, map, forEach, findKey, keys, isArray } from 'lodash';
import { AnyAction } from 'redux';

type Action<T extends object> = { [key in keyof T]: (...args: object[]) => { type: string; [key: string]: any } };

type Types<T extends object> = { [key in keyof T]: string };

function createType(action: string) {
  const actionParts = action.trim().split(/(?=[A-Z])/);
  const formatedParts = map(actionParts, part => {
    if (isEmpty(part) || /\s/.test(part)) {
      throw new Error(`Action ${action} invalid name`);
    }
    return part.toUpperCase();
  });
  if (isEmpty(formatedParts)) {
    throw new Error(`Action ${action} invalid name`);
  }
  return formatedParts.join('_');
}

function createAction(type: string) {
  return (...args: any) => {
    const allArgs = args.reduce((result: object, arg: any) => {
      if (typeof arg !== 'object' && arg !== undefined) {
        throw new Error(`Action arguments is expected be an object but got ${typeof arg}`);
      }
      if (isArray(arg)) {
        throw new Error('Action arguments is expected be an object but got array');
      }
      return { ...result, ...arg };
    },                          {});

    return {
      type,
      ...allArgs,
    };
  };
}

function createActions<T extends object>(...params: string[]): { actions: Action<T>; types: Types<T> } {
  const actions: any = {};
  const types: any = {};
  forEach(params, action => {
    const type = createType(action);
    types[action] = type;
    actions[action] = createAction(type);
  });
  return { actions, types };
}

function createReducer<T, P extends { [key: string]: (state: T, action: AnyAction) => T }, K extends Types<P>>(
  INITIAL_STATE: T,
  actions: P,
  types: K,
) {
  return (state = INITIAL_STATE, action: AnyAction) => {
    const checkAction = findKey(types, type => type === action.type);
    if (checkAction) {
      return actions[checkAction](state, action);
    }
    return state;
  };
}

type CreateReduxReturn<T, P extends { [key: string]: (state: T, action: AnyAction) => T }> = T extends undefined
  ? { actions: Action<P>; types: Types<P> }
  : {
    actions: Action<P>;
    types: Types<P>;
    reducer: (state: T | undefined, action: AnyAction) => T;
  };

export default function createRedux<T, P extends { [key: string]: (state: T, action: AnyAction) => T }>(
  INITIAL_STATE: T,
  reqActions: P,
): CreateReduxReturn<T, P> {
  const actionsNames = keys(reqActions);
  if (actionsNames.length === 0) {
    return { actions: {}, types: {} } as any;
  }
  const { actions, types } = createActions<P>(...actionsNames);
  if (INITIAL_STATE === undefined) {
    return { actions, types } as any;
  }
  const reducer = createReducer(INITIAL_STATE, reqActions, types);
  return { actions, types, reducer } as any;
}
