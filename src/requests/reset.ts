import { axiosPost, Response } from './http';

import { IUser as User } from 'reducers';

export interface QuestionType {
  _id: string;
  response: string;
}

export interface IResetParams {
  email: string;
  question: QuestionType;
}

export const ResetRequest = (data: IResetParams): Promise<Response<User>> =>
  axiosPost('v1/users/renewPasswordBySecretQuestion', { data, sendToken: false });
