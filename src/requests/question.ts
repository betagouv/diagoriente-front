import { axiosPut, axiosGet, Response } from './http';

export interface IResponse {
  questionJobId: string;
  jobId: string;
  parcourId: string;
  response: boolean;
}
export interface IQuestion {
  readonly _id: string;
  readonly title: string;
}
export interface IListQuestionParams {
  page?: number;
  perPage?: number;
  search?: string;
  type?: string;
}

export type ListQuestionResponse = IQuestion[];

export const listQuestions = (
  params?: IListQuestionParams,
): Promise<Response<ListQuestionResponse>> =>
  axiosGet('v1/questions', { data: params, sendToken: false });

export const postResponseJobs = (data: any) =>
  axiosPut('v1/responseJobs', { data, sendToken: true });
