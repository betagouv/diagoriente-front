import { axiosGet, Response } from './http';

export interface ICompetence {
  _id: string;
  title: string;
  rank: string;
}

export interface ListCompetencesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export const listCompetences = (params?: ListCompetencesParams): Promise<Response<ICompetence[]>> =>
  axiosGet('v1/competences', { params });
