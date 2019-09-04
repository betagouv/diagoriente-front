import { axiosGet, Response } from './http';

export interface ICommune {
  Code_commune_INSEE: string;
  Nom_commune: string;
  Code_postal: number;
  Libelle_acheminement: string;
  Ligne_5: string;
  coordonnees_gps: string;
}

export interface ListCommunesParams {
  page?: number;
  perPage?: number;
  search?: string;
}
export interface CommunesList {
  count: 1;
  currentPage: 1;
  data: ICommune[];
  document: 'environments';
  perPage: 10;
  totalPages: 1;
}

export const listCommunes = (params?: ListCommunesParams): Promise<Response<CommunesList>> => {
  return axiosGet('v1/commune/all/', { params });
};
