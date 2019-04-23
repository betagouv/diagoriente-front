import { axiosPost, Response } from './http';

import { IUser as User, IToken } from 'reducers';

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IUser {
  user: User;
  token: IToken;
}

export const LoginUserRequest = (params: ILoginParams): Promise<Response<IUser>> =>
  axiosPost('v1/auth/user', { data: params, sendToken: false });

export interface RefreshTokenParams {
  userId: string;
  refreshToken: string;
}

export const refreshToken = (data: RefreshTokenParams): Promise<Response<IToken>> =>
  axiosPost('v1/auth/refresh-token', { data, sendToken: false });
