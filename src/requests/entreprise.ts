import { axiosGet, Response } from './http';

export interface IParamsEntreprise {
  commune_id: string;
  contract: string;
  latitude: number;
  longitude: number;
  distance: number;
  rome_codes: string;
}

export interface ListEntrepriseParams {
  commune_id: string;
  contract: string;
  latitude: number;
  longitude: number;
  distance: number;
  rome_codes: string;
}

export const listEntreprise = (params?: ListEntrepriseParams): Promise<Response<any>> => axiosGet('v1/entreprise/all', { params });
