import { Response, axiosGet } from './http';

export interface IPage {
  type: string;
  title: string;
  page: { text: string }[];
}
export interface PageList {
  count: 1;
  currentPage: 1;
  data: IPage;
  document: 'about';
  perPage: 10;
  totalPages: 1;
}
export const getAbout = (type: 'about'): Promise<Response<PageList>> =>
  axiosGet('v1/page/getOne', { params: { type } });
