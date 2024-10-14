import { SortInfo } from '@trading/pages/BotsPage/components/BotsTable/types';
import { SORT_ORDER_ASC, SORT_ORDER_DESC } from './constants';

export type SortOrder = typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC;

export interface TableContextContent {
  sortColumn?: string;
  sortOrder?: SortOrder;
  defaultSort: SortInfo<string>;
  setSortColumn: (column?: string) => void;
  setSortOrder: (order?: SortOrder) => void;
  setDefaultSort: (defaultSort: SortInfo<string>) => void;
}
