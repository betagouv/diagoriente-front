import React, {
  useReducer,
  forwardRef,
  Ref,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  ComponentType,
} from 'react';

import { pickBy } from 'lodash';
import { AnyAction } from 'redux';
import { Response, ReturnPromiseType } from '../requests';

import createRedux from '../utils/createRedux';

interface IApiState<T> {
  fetching: boolean;
  error: string;
  data: T;
  errors: any[];
}

export type ApiComponentProps
  <R extends { [key: string]: (...args: any[]) => Promise<Response<any>> }
> = {
  [K in keyof R]: {
    fetching: boolean;
    error: string;
    data: ReturnPromiseType<R[K]>;
    errors: any[];
    call: R[K];
  };
};

function useApiState<
  Fn extends(...args: any[]) => Promise<Response<any>>,
  T = ReturnPromiseType<Fn>
>(fn: Fn): IApiState<T> & { call: (...params: Parameters<Fn>) => Promise<void> } {
  const INITIAL_STATE: IApiState<T> = {
    fetching: false,
    error: '',
    data: {},
    errors: [],
  } as any;

  const fetching = (state: IApiState<T>) => ({ ...state, fetching: true, error: '' });
  const success = (state: IApiState<T>, { data }: AnyAction) => ({
    ...state,
    data,
    fetching: false,
  });
  const failure = (state: IApiState<T>, { error, errors }: AnyAction) => ({
    ...state,
    error,
    errors,
    fetching: false,
  });

  const { actions, reducer } = createRedux(INITIAL_STATE, { fetching, success, failure });

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  async function call(...params: Parameters<Fn>) {
    try {
      const apiParams = params.map((param: any) => {
        if (typeof param === 'object') {
          return pickBy(param, val => val !== undefined);
        }
        return param;
      });

      await dispatch(actions.fetching());

      const response = await fn(...apiParams);
      if (response.code >= 200 && response.code < 400 && response.data) {
        await dispatch(actions.success({ data: response.data }));
      } else if (response.code === 401) {
        await dispatch(actions.failure({ error: 'UNAUTHORIZED' }));
      } else {
        const errors: { error?: string; errors?: any[] } = {};
        if (response.message) errors.error = response.message;
        if (response.errors) errors.errors = response.errors;
        await dispatch(actions.failure(errors));
      }
    } catch (e) {
      await dispatch(
        actions.failure({
          error:
            "Erreur inconnue, vérifiez votre connexion Internet ou essayez d'actualiser la page.",
        }),
      );
    }
  }

  return { ...state, call };
}

function withApis<R extends { [key: string]:(...args: any[]) => Promise<Response<any>> }>(
  requests: R) {
  return function<P extends ApiComponentProps<R>> (
    WrappedComponent: React.ComponentType<P>,
  ): ForwardRefExoticComponent<
    PropsWithoutRef<Pick<P, Exclude<keyof P, keyof R>>> & RefAttributes<ComponentType<P>>
  > {
    return forwardRef(
      (props: Omit<P, keyof ApiComponentProps<R>>, ref: Ref<React.ComponentType<P>>) => {
        const injectedProps: any = {};
        const keys = Object.keys(requests);
        const { length } = keys;

        for (let i = 0; i < length; i += 1) {
          const key = keys[i];
          // eslint-disable-next-line
          injectedProps[key] = useApiState(requests[key]);
        }

        return <WrappedComponent ref={ref} {...injectedProps} {...props} />;
      },
    );
  };
}

export default withApis;
