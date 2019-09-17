import { axiosGet, Response } from './http';

export const getPublicProfile = (userId: string): Promise<Response<any>> =>
  axiosGet(`v1/parcours/public/${userId}`);
