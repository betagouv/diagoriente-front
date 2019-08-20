import { IFamille } from 'reducers';
import { axiosGet, axiosPost, Response } from './http';

export interface ListFamilleParams {
  search?: string;
  perPage?: number;
  page?: Number;
}

export interface FamilleList {
  _id: string;
  nom: string;
  interests: { _id: string; nom: string; rank: string }[];
}

export const getListFamille = (params: ListFamilleParams = {}): Promise<Response<FamilleList>> =>
  axiosGet('v1/families', { params });

export const getFamilleDetails = (id: string): Promise<Response<IFamille>> => axiosGet(`v1/families/${id}`);

export interface AddFamillesToParcoursParams {
  parcourId: string;
  families: string[];
}

export const addFamillesToParcours = ({ parcourId, ...data }: AddFamillesToParcoursParams) =>
  axiosPost(`v1/parcours/families/${parcourId}`, { data });
