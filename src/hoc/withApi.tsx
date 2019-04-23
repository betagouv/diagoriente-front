import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { pickBy } from 'lodash';
import { Response, ReturnPromiseType, ArgumentsType } from '../requests';

export type ApiComponentProps<R extends { [key: string]: (...args: any[]) => Promise<Response<any>> }> = {
  [K in keyof R]: {
    fetching: boolean;
    error: string;
    data: ReturnPromiseType<R[K]>;
    errors: any[];
    call: R[K];
  }
};

type State<R> = {
  [K in keyof R]: {
    fetching: boolean;
    error: string;
    data: R[K];
    errors: any[];
  }
};

function withApis<
  R extends { [key: string]: (...args: any[]) => Promise<Response<any>> },
  P extends { [K in keyof R]: ArgumentsType<R[K]> },
  T extends { [K in keyof R]: ReturnPromiseType<R[K]> }
>(requests: R) {
  // eslint-disable-next-line
  return function<A>(
    WrappedComponent: React.ComponentType<ApiComponentProps<R> & RouteComponentProps & A>,
  ): React.ComponentType<RouteComponentProps & A> {
    return class extends React.Component<RouteComponentProps & A, State<T>> {
      constructor(props: RouteComponentProps & A) {
        super(props);
        const state: any = {};
        const calls: any = {};
        Object.keys(requests).forEach(key => {
          state[key] = {
            fetching: false,
            error: '',
            data: {},
            errors: [],
          };
          calls[key] = this.callApi(key);
        });
        this.state = state;
        this.calls = calls;
      }

      callApi = <K extends keyof R>(key: K) => async (...params: P[K]) => {
        try {
          const apiParams = params.map((param: any) => {
            if (typeof param === 'object') {
              return pickBy(param, val => val !== null || val !== undefined);
            }
            return param;
          });

          this.setState(state => ({
            [key]: {
              ...state[key],
              fetching: true,
              error: '',
              errors: [],
            },
          }));
          const response = await requests[key](...apiParams);
          if (response.code >= 200 && response.code < 400 && response.data) {
            this.setState(state => ({
              [key]: { ...state[key], fetching: false, data: response.data },
            }));
          } else if (response.code === 401) {
            this.props.history.push('/login');
          } else {
            const errors: { error?: string; errors?: any[] } = {};
            if (response.message) errors.error = response.message;
            if (response.errors) errors.errors = response.errors;
            this.setState(state => ({
              [key]: { ...state[key], fetching: false, ...errors },
            }));
          }
        } catch (e) {
          this.setState(state => ({
            [key]: {
              ...state[key],
              fetching: false,
              error: "Erreur inconnue, vérifiez votre connexion Internet ou essayez d'actualiser la page.",
            },
          }));
        }
      }

      calls: { [K in keyof R]: (...params: P[K]) => Promise<Response<T[K]>> };

      render() {
        const keys = Object.keys(requests);
        const injectedProps: ApiComponentProps<R> = (keys.reduce as any)(
          (result: ApiComponentProps<R>, key: keyof R) => ({
            ...result,
            [key]: { ...this.state[key], call: this.calls[key as keyof R] },
          }),
          {},
        );

        return <WrappedComponent {...injectedProps} {...this.props} />;
      }
    };
  };
}

export default withApis;
