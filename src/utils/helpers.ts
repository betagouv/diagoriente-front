import { uniqBy } from 'lodash';

export const add = <T extends { _id: string; [key: string]: any }>(table: T[], row: T) =>
  uniqBy([...table, row], ({ _id }) => _id);
export const remove = <T extends { _id: string; [key: string]: any }>(table: T[], row: T) =>
  table.filter(item => item._id !== row._id);
