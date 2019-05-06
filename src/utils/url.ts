import { map } from 'lodash';

export function encodeUri(params: object): string {
  const searchParams = map(params, (param, key) => `${encodeURIComponent(key)}=${encodeURIComponent(param)}`).join('&');
  console.log({ searchParams });
  return `?${searchParams}`;
}

export function decodeUri(uri: string) {
  const urlSearch = new URLSearchParams(uri);
  const urlSearchParams: { [key: string]: string } = {};
  // eslint-disable-next-line
  for (const param of urlSearch.entries()) {
    urlSearchParams[param[0]] = param[1];
  }
  return urlSearchParams;
}
