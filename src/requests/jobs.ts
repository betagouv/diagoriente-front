import { Response, axiosGet, axiosPost } from './http';

interface IJob {
  title: string;
  description: string;
  interests: { _id: string; weight: number; rank: string; nom: string }[];
  competences: { _id: string; weight: number; rank: string; title: string }[];
  formations: any;
  _id: string;
  jobRank: number;
  secteur: any[];
  accessibility: string;
  interested: boolean | null;
}

export const getMyJob = (
  parcourId: string,
  algoType: 'interest_family' | 'family' | 'interest' = 'interest_family',
): Promise<Response<IJob[]>> => axiosGet('v1/jobs/myJobs', { params: { parcourId, algoType } });

export interface FavoritesData {
  interested: boolean | null;
  job: string;
  parcour: string;
}

export const createFavorites = (data: FavoritesData): Promise<Response<any>> => axiosPost('v1/favorites', { data });
