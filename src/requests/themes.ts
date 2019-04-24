import { axiosGet, Response, ListResponse } from './http';
import { IActivity } from './activity';

export interface IListThemesParams {
  page?: number;
  perPage?: number;
  search?: string;
  type?: string;
}

export interface ITheme {
  _id: string;
  title: string;
  parentId: string;
  description: string;
  type: string;
  verified: boolean;
  createdAt: string;
  activities: IActivity[];
  resources: { color: string; backgroundColor: string; icon: string };
}

export type ListThemesResponse = ListResponse<ITheme>;

export const listThemes = (params?: IListThemesParams): Promise<Response<ListThemesResponse>> => {
  return axiosGet('v1/themes', { params });
};

export const getTheme = (id: string): Promise<Response<ITheme>> => axiosGet(`v1/themes/${id}`);
