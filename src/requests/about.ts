import { Response, axiosGet } from './http';

export const getAbout = (): Promise<Response<any>> => axiosGet('v1/apropos');
