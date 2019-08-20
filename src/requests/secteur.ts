import { ISecteur } from 'requests/jobs';
import { Response, axiosGet } from './http';

export const getSecteurs = (): Promise<Response<ISecteur[]>> => axiosGet('v1/jobs/secteurs');
