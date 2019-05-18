import { axiosGet, Response } from './http';

import { IActivity } from 'reducers';

export interface activityParams {}

export const getActivity = ({ id }: any): Promise<Response<IActivity>> => {
  return axiosGet(`v1/themes/${id}`);
};
