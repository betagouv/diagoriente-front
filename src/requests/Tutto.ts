import { axiosPatch, Response } from './http';

export interface tutoParam {}

export const patchTuto = (userId: string, tuto: boolean[]): Promise<Response<any>> => {
  console.log('tuutoparam', tuto);
  return axiosPatch(`v1/users/updateTuto/${userId}`, { data: { tutorial: tuto } });
};
