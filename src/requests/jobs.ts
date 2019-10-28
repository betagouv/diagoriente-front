import {
 Response, axiosGet, axiosPost, axiosDelete, ListResponse,
} from './http';

export interface ISecteur {
  activities: null;
  parentId: null;
  resources: {
    backgroundColor: string;
    icon: string;
  };
  search: string;
  title: string;
  type: string;
  _id: string;
}

export interface IJob {
  title: string;
  description: string;
  interests: { _id: string; weight: number; rank: string; nom: string }[];
  competences: { _id: string; weight: number; rank: string; title: string }[];
  formations: any;
  _id: string;
  jobRank: number;
  secteur: ISecteur[];
  accessibility: string;
  interested: boolean | null;
  favoriteId: string | null;
  environments: { _id: string; title: string }[];
}

export interface IJobQuestion {
  _id: string;
  label: string;
}

export const getMyJob = (
  parcourId: string,
  environments?: string,
  secteur?: string,
  accessibility?: string,
  algoType: 'interest_family' | 'family' | 'interest' = 'interest_family',
): Promise<Response<IJob[]>> => {
  console.log('herrrree test', accessibility)
  const env = environments && JSON.parse(environments).length ? environments : null;
  const sect = secteur && JSON.parse(secteur).length ? secteur : null;
  const niv = accessibility && JSON.parse(accessibility).length ? accessibility : null;
  return axiosGet('v1/jobs/myJobs', {
    params: {
      parcourId,
      algoType,
      accessibility: niv,
      environments: env,
      secteur: sect,
    },
  });
};

export const getOneJob = (id: string, parcourId: string): Promise<Response<any>> =>
  axiosGet(`v1/jobs/${id}?parcourId=${parcourId}`);

export interface FavoritesData {
  interested: boolean | null;
  job: string;
  parcour: string;
}

export const createFavorites = (data: FavoritesData): Promise<Response<any>> =>
  axiosPost('v1/favorites', { data });

export const getFavorites = (): Promise<Response<any>> => axiosGet('v1/favorites');

export const deleteFavorites = (id: string): Promise<Response<any>> =>
  axiosDelete(`v1/favorites/${id}`);

export const jobQuestion = (): Promise<Response<ListResponse<IJobQuestion>>> =>
  axiosGet('v1/questionJobs');
