import { IUser as User, IToken, IAdvisor } from 'reducers';
import { QuestionQuery } from 'requests';
import { axiosPost, Response, axiosPatch } from './http';

export interface ILoginParams {
  email: string;
  password: string;
}
export interface IPatchParams {
  firstName: string;
  lastName: string;
  OldPassword: string;
  password: string;
  question: QuestionQuery;
}

export interface patchAdvisorParams {
  firstName: string;
  lastName: string;
  OldPassword: string;
  password: string;
  email: string;
  institution: string;
}

export interface IUser {
  user: User;
  token: IToken;
}

export const loginUserRequest = (params: ILoginParams): Promise<Response<IUser>> =>
  axiosPost('v1/auth/user', { data: params, sendToken: false });

export interface RefreshTokenParams {
  userId: string;
  refreshToken: string;
}

export const refreshToken = (data: RefreshTokenParams): Promise<Response<IToken>> =>
  axiosPost('v1/auth/refresh-token', { data, sendToken: false });

export const loginAdvisorRequest = (data: ILoginParams): Promise<Response<IAdvisor>> =>
  axiosPost('v1/auth/advisor', { data, sendToken: false });

export const patchUser = (data: IPatchParams, id: string): Promise<Response<any>> =>
  axiosPatch(`v1/users/updateMe/${id}`, { data });

export const patchAdvisor = (data: patchAdvisorParams, id: string): Promise<Response<any>> =>
  axiosPatch(`v1/users/advisors/${id}`, { data });
