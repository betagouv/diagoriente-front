import { Response, axiosGet } from './http';


export const getNiveau = (): Promise<Response<string[]>> => axiosGet('v1/jobs/niveau');

export const getAccessibility = (): Promise<Response<string[]>> => axiosGet('v1/accessibility');
