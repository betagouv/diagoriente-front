import { axiosPatch, Response } from './http';

export interface tutoParam {}

export const patchTuto = (userId: string, tuto: boolean[]): Promise<Response<any>> =>
  axiosPatch(`v1/users/updateTuto/${userId}`, { data: { tutorial: tuto } });
