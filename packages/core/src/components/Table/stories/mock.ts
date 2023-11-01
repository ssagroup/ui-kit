import { RowKeysArray } from './types';

export const dataForTableSorting = Array.from({ length: 10 }).map(
  (_, index) => ({
    title: `title ${index + 1}`,
    value: `value ${index + 1}`,
    description: `description ${index + 1}`,
  }),
);

export const headers = Object.keys(
  dataForTableSorting[0],
) as unknown as RowKeysArray;

type DataRow = (typeof dataForTableSorting)[0];
export type RowKeys = keyof DataRow;
