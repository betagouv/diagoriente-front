import { axiosPost, Response } from './http';

import { IUser as User, IQuestion } from 'reducers';


export interface QuestionQuery {
  _id: string;
  response: string;
}

export interface IRegisterParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  institution: string;
  question: QuestionQuery;

}

export const RegisterUserRequest = (data: IRegisterParams): Promise<Response<User>> =>
  axiosPost('v1/users/addUser', { data, sendToken: false });
