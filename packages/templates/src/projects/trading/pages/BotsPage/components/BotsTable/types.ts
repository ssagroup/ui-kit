import { MouseEvent } from 'react';
import { APIListResponse, Bot } from '@trading/types';
import { COLUMN_API_NAMES } from './consts';

export type BotsTableProps = {
  botsResponse: {
    data: {
      result: APIListResponse<Bot>;
    };
    isFetching: boolean;
    isError: boolean;
  };
  allRowsDisabled?: boolean;
  onRowClick: (bot: Bot) => (event: MouseEvent<HTMLTableRowElement>) => void;
  handleSortingChange: (sortInfo: SortInfo<string>) => void;
};

export type HeaderProps = {
  columns: ReadonlyArray<string>;
  columnsApiNames: ReadonlyArray<string>;
  handleSortingChange: BotsTableProps['handleSortingChange'];
};

export type RowKeys = (typeof COLUMN_API_NAMES)[number];

export type SortInfo<R extends string> =
  | {
      column: R;
      order: 'asc' | 'desc';
    }
  | Record<string, never>;

export type BotsSortInfo = SortInfo<RowKeys>;
