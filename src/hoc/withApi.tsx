import React, { useReducer } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { pickBy } from 'lodash';
import { Response, ReturnPromiseType } from '../requests';

import createRedux from '../utils/createRedux';
import { AnyAction } from 'redux';

interface IApiState<T> {
  fetching: boolean;
  error: string;
  data: T;
  errors: any[];
}

export type ApiComponentProps<R extends { [key: string]: (...args: any[]) => Promise<Response<any>> }> = {
  [K in keyof R]: {
    fetching: boolean;
    error: string;
    data: ReturnPromiseType<R[K]>;
    errors: any[];
    call: R[K];
    cancel: () => void;
  }
};

function useApiState<Fn extends (...args: any[]) => Promise<Response<any>>, T = ReturnPromiseType<Fn>>(
  fn: Fn,
): IApiState<T> & { call: (...params: Parameters<Fn>) => Promise<void> } {
  const INITIAL_STATE: IApiState<T> = { fetching: false, error: '', data: {}, errors: [] } as any;

  const fetching = (state: IApiState<T>) => ({ ...state, fetching: true, error: '' });
  const success = (state: IApiState<T>, { data }: AnyAction) => ({ ...state, data, fetching: false });
  const failure = (state: IApiState<T>, { error, errors }: AnyAction) => ({ ...state, error, errors, fetching: false });

  const { actions, reducer } = createRedux(INITIAL_STATE, { fetching, success, failure });

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  async function call(...params: Parameters<Fn>) {
    try {
      const apiParams = params.map((param: any) => {
        if (typeof param === 'object') {
          return pickBy(param, val => val !== null || val !== undefined);
        }
        return param;
      });

      await dispatch(actions.fetching());

      const response = await fn(...apiParams);
      if (response.code >= 200 && response.code < 400 && response.data) {
        await dispatch(actions.success({ data: response.data }));
      } else if (response.code === 401) {
        // should show not authorized alert
      } else {
        const errors: { error?: string; errors?: any[] } = {};
        if (response.message) errors.error = response.message;
        if (response.errors) errors.errors = response.errors;
        await dispatch(actions.failure(errors));
      }
    } catch (e) {
      await dispatch(
        actions.failure({
          error: "Erreur inconnue, vérifiez votre connexion Internet ou essayez d'actualiser la page.",
        }),
      );
    }
  }

  return { ...state, call };
}

function withApis<R extends { [key: string]: (...args: any[]) => Promise<Response<any>> }>(requests: R) {
  return function<A>(
    WrappedComponent: React.ComponentType<ApiComponentProps<R> & RouteComponentProps & A>,
  ): React.ComponentType<RouteComponentProps & A> {
    return (props: RouteComponentProps & A) => {
      const injectedProps: any = {};
      const keys = Object.keys(requests);
      const length = keys.length;

      for (let i = 0; i < length; i += 1) {
        const key = keys[i];
        injectedProps[key] = useApiState(requests[key]);
      }
      return <WrappedComponent {...injectedProps} {...props} />;
    };
  };
}

export default withApis;
