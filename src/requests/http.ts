import axios, { AxiosResponse } from 'axios';

const BaseURL = process.env.REACT_APP_API_URL || 'https://api3.projetttv.org';

// eslint-disable-next-line
export let authorizationBearer: string | null = null;

export const setAuthorizationBearer = (token: string | null) => {
  authorizationBearer = token;
};

type Method = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

export interface Response<T> {
  code: number;
  data?: T;
  errors?: string[];
  message?: string;
}

export type ListResponse<T> = {
  count?: number;
  currentPage?: number;
  data: T[];
  document?: string;
  perPage?: number;
  totalPages?: number;
};

function axiosRequest<T, P>(
  method: Method,
  baseURL: string,
  url: string,
  params: P,
  headers: any,
): Promise<Response<T>> {
  return new Promise((resolve, reject) => {
    axios({
      baseURL,
      method,
      url,
      timeout: 300000,
      ...params,
      headers: {
        ...headers,
      },
    })
      .then(
        (payload: AxiosResponse<T>) => {
          resolve({ data: payload.data, code: payload.status });
        },
        (payload: any) => {
          if (payload.response) {
            const { response } = payload;
            if (response.status >= 400 && response.status < 500) {
              resolve(response.data);
            } else {
              reject(response);
            }
          } else {
            reject(payload);
          }
        },
      )
      .catch(e => {
        throw e;
      });
  });
}

/* ------ Request POST ------ */
export function axiosPost<T, P extends object>(
  url: string,
  params?: P,
  timeout = null,
): Promise<Response<T>> {
  let p: any = {
    sendToken: true,
    data: {},
    headers: {},
  };

  if (params) {
    p = { ...p, ...params };
  }

  const { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams: { data: P; timeout?: number | null } = { data: p.data };
  if (timeout) {
    reqParams.timeout = timeout;
  }

  return axiosRequest('POST', BaseURL, url, reqParams, headers);
}

/* ------ Request PUT ------ */
export function axiosPut<T, P extends object>(
  url: string,
  params?: P,
  timeout = null,
): Promise<Response<T>> {
  let p: any = { sendToken: true, data: {}, headers: {} };
  if (params) {
    p = { ...p, ...params };
  }
  const { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams: { data: P; timeout?: number | null } = { data: p.data };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('PUT', BaseURL, url, reqParams, headers);
}

/* ------ Request PATCH ------ */
export function axiosPatch<T, P extends object>(
  url: string,
  params?: P,
  timeout = null,
): Promise<Response<T>> {
  let p: any = { sendToken: true, data: {}, headers: {} };
  if (params) {
    p = { ...p, ...params };
  }
  const { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams: { data: P; timeout?: number | null } = { data: p.data };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('PATCH', BaseURL, url, reqParams, headers);
}

/* ------ Request GET ------ */
export function axiosGet<T, P extends object>(
  url: string,
  params?: P,
  timeout = null,
): Promise<Response<T>> {
  let p: any = { sendToken: true, params: {}, headers: {} };
  if (params) {
    p = { ...p, ...params };
  }
  const { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams: { params: P; timeout?: number | null } = {
    params: p.params,
  };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('GET', BaseURL, url, reqParams, headers);
}

/* ------ Request DELETE ------ */
export function axiosDelete<T, P extends object>(
  url: string,
  params?: P,
  timeout = null,
): Promise<Response<T>> {
  let p: any = { sendToken: true, headers: {}, ...params };
  if (params) {
    p = { ...p, ...params };
  }
  const { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams: { params: P; timeout?: number | null } = {
    params: p.params,
  };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('DELETE', BaseURL, url, reqParams, headers);
}

/* ------ Request POST files ------ */
export function axiosPostFilesData<T, P extends object>(
  url: string,
  params?: P,
  timeout = 60000,
): Promise<Response<T>> {
  const p: any = {
    sendToken: true,
    form: {},
    headers: {},
    ...params,
  };
  const { headers } = p;

  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams: { data: P; timeout?: number | null } = { data: p.data };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('POST', BaseURL, url, reqParams, headers);
}
