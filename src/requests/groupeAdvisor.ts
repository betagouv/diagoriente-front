import { axiosGet, Response, ListResponse } from './http';

export interface ListGroupParams {
  page?: number;
  perPage?: number;
  search?: string;
  advisorId?: any;
}
export interface IGroup {
  _id: string;
  title: string;
  advisorId: string;
  code: string;
  users: any[];
}
/* export interface ListResponse<T> {
  count: number;
  currentPage: number;
  data: T[];
  document: string;
  perPage: number;
  totalPages: number;
} */
export type ListGroupResponse = ListResponse<IGroup>;
export const listGroupe = (params: ListGroupParams): Promise<Response<ListGroupResponse>> =>
  axiosGet(`v1/groupe/advisor/${params.advisorId}`, { params });
