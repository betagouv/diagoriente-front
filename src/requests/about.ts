import { Response, axiosGet } from './http';

export interface IPage {
  type: string;
  title: string;
  page: { text: string }[];
}
export const getAbout = (): Promise<Response<any>> =>
  axiosGet('v1/page/getOne', { params: { type: 'about' } });
