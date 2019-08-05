import { axiosGet, Response } from './http';

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

export const listQuestions = (params?: IListQuestionParams): Promise<Response<ListQuestionResponse>> => {
  return axiosGet('v1/questions', { data: params, sendToken: false });
};
