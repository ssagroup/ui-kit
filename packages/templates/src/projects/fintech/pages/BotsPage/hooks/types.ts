import { SearchType } from '../types';

export type UseQueryParams = {
  initParams: SearchType;
  perPage: number;
  totalCount: number;
};
