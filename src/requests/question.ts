import { axiosGet, Response, ListResponse } from './http';
import { IQuestion } from 'reducers'
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