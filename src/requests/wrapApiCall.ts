import { call } from 'redux-saga/effects';
import { Response } from './http';

export interface ISuccessResponse<T> {
  data: T;
  success: true;
}
export interface IErrorResponse {
  errors: string[];
  message: string;
  success: false;
}

export type WrappedResponse<T> = ISuccessResponse<T> | IErrorResponse;

export type ReturnPromiseType<T> = T extends (...args: any[]) => Promise<Response<infer ReturnType>>
  ? ReturnType
  : any;
export type ArgumentsType<T> = T extends (...args: infer A) => any ? A : never;

export function* wrapApiCall<Fn extends(...args: any[]) => Promise<Response<any>>>(
  fn: Fn,
  ...args: ArgumentsType<Fn>): IterableIterator<WrappedResponse<ReturnPromiseType<Fn>>> {
  try {
    // do the api call
    const response: Response<ReturnPromiseType<Fn>> = yield (call as any)(fn, ...args);
    if (response.code >= 400) {
      if (response.code === 401) {
        // TODO should display expired modal
      }
      return {
        message: response.message,
        errors: response.errors,
        success: false,
      };
    }

    return { data: response.data, success: true };
  } catch (error) {
    // TODO should display no connexion modal
  }
}
