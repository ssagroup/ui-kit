import { RowKeys } from './mock';

export type RowKeysArray = ['title', 'value', 'description'];
export type SortInfo =
  | {
      column: RowKeys;
      order: 'asc' | 'desc';
    }
  | Record<string, never>;
