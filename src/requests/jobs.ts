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
}

export interface IJobQuestion {
  _id: string;
  label: string;
}

export const getMyJob = (
  parcourId: string,
  environments?: string,
  secteur?: string,
  algoType: 'interest_family' | 'family' | 'interest' = 'family',
): Promise<Response<IJob[]>> => {
  const env = environments && JSON.parse(environments).length ? environments : null;
  const sect = secteur && JSON.parse(secteur).length ? secteur : null;
  return axiosGet('v1/jobs/myJobs', {
    params: {
      parcourId,
      algoType,
      environments: env,
      secteur: sect,
    },
  });
};

export const getOneJob = (id: string): Promise<Response<any>> => axiosGet(`v1/jobs/${id}`);

type responseProps = {
  questionJobId: string;
  response: boolean;
};

export interface FavoritesData {
  interested: boolean | null;
  job: string;
  parcour: string;
  responses: responseProps[];
}

export const createFavorites = (data: FavoritesData): Promise<Response<any>> =>
  axiosPost('v1/favorites', { data });

export const getFavorites = (): Promise<Response<any>> => axiosGet('v1/favorites');

export const deleteFavorites = (id: string): Promise<Response<any>> =>
  axiosDelete(`v1/favorites/${id}`);

export const jobQuestion = (): Promise<Response<ListResponse<IJobQuestion>>> =>
  axiosGet('v1/questionJobs');
