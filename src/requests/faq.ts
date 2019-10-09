import { Response, axiosGet } from './http';

export const getFaq = (): Promise<Response<any>> => axiosGet('v1/faq');
export const getOneFaq = (id: string): Promise<Response<any>> => axiosGet(`v1/faq/${id}`);
