import { axiosPost, axiosGet, Response } from './http';

export interface ICreateParcoursParams {
  userId?: string;
  advisorId?: string;
}

export const createParcours = (data: ICreateParcoursParams): Promise<Response<any>> =>
  axiosPost('v1/parcours', { data });

export const getParcours = (id: string): Promise<Response<any>> => axiosGet(`v1/parcours/${id}`);

export const updateParcours = (id: string): Promise<Response<any>> => axiosPost(`v1/parcours/${id}`);
