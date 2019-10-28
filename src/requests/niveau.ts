import { Response, axiosGet } from './http';


export const getNiveau = (): Promise<Response<string[]>> => axiosGet('v1/jobs/niveau');
