import { SortInfo } from './types';

export const COLUMNS = [
  'pages.bots.table.columns.name',
  'pages.bots.table.columns.strategy',
  'pages.bots.table.columns.funds',
  'pages.bots.table.columns.status',
  'pages.bots.table.columns.pnl',
  'pages.bots.table.columns.roi',
  '',
] as const;

export const DEFAULT_SORT: SortInfo<string> = {
  column: 'Name',
  order: 'asc',
};

export const COLUMN_API_NAMES = [
  'name',
  'strategy',
  'currentlyInUsePercents',
  'status',
  'statistics.pnl',
  'statistics.roi',
  '',
] as const;
