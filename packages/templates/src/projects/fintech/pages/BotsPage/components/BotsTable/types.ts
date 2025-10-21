import { AllBots } from '../../__mock__/allBots';

import { COLUMN_API_NAMES } from './consts';

export type BotsTableProps = {
  response: AllBots;
  allRowsDisabled?: boolean;
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
