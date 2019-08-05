import { axiosGet, Response, ListResponse } from './http';
import { ITheme } from 'reducers';

export interface IListThemesParams {
  page?: number;
  perPage?: number;
  search?: string;
  type?: 'professional' | 'personal';
}

export type ListThemesResponse = ListResponse<ITheme>;

export const listThemes = (params?: IListThemesParams): Promise<Response<ListThemesResponse>> => {
  return axiosGet('v1/themes/all', { params });
};

export const getTheme = (id: string): Promise<Response<ITheme>> => axiosGet(`v1/themes/${id}`);
