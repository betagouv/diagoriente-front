import { axiosPost, Response } from './http';

import { IUser as User } from 'reducers';

export interface IUpdateParams {
  password: string;
  token: string;
}

export const UpdateRequest = (data: IUpdateParams): Promise<Response<User>> =>
  axiosPost('v1/users/updatePassword', { data });
