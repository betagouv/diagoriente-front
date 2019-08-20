import { IEnvironment } from 'reducers';
import { axiosGet, Response } from './http';

export interface ListEnvironmentParams {
  search?: string;
  perPage?: number;
  page?: Number;
}

export interface EnvironmentList {
  count: 1;
  currentPage: 1;
  data: IEnvironment[];
  document: 'environments';
  perPage: 30;
  totalPages: 1;
}

export const getListEnvironment = (
  params: ListEnvironmentParams = {},
): Promise<Response<EnvironmentList>> => axiosGet('v1/environments', { params });
