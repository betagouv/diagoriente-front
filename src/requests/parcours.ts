import { axiosPost, axiosGet, Response } from './http';
import { IParcoursResponse } from 'reducers';

export interface ICreateParcoursParams {
  userId?: string;
  advisorId?: string;
}

export const createParcours = (data: ICreateParcoursParams): Promise<Response<any>> =>
  axiosPost('v1/parcours', { data });

export const getParcours = (id: string): Promise<Response<any>> => axiosGet(`v1/parcours/${id}`);

export interface ISkill {
  theme: string;
  activities: string[];
  competences: { _id: string; value: number }[];
}

export interface IUpdateParcoursParams {
  skills?: ISkill[];
  families?: string[];
  played?: boolean;
}

export const updateParcours = (id: string, data: IUpdateParcoursParams): Promise<Response<IParcoursResponse>> =>
  axiosPost(`v1/parcours/${id}`, { data });
