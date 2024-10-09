import { SortInfo } from './types';

export const COLUMNS = [
  'pages.bots.table.columns.name',
  'pages.bots.table.columns.strategy',
  'pages.bots.table.columns.orderSize',
  'pages.bots.table.columns.funds',
  'pages.bots.table.columns.status',
  'pages.bots.table.columns.pair',
  'pages.bots.table.columns.pnl',
  'pages.bots.table.columns.roi',
  '',
] as const;

export const DEFAULT_SORT: SortInfo<string> = {
  column: 'Name',
  order: 'asc',
};

export const COLUMN_API_NAMES = [
  'Name',
  'Strategy',
  'AverageOrderSize',
  'CurrentlyInUsePercents',
  'Status',
  'Instrument',
  'PNL',
  'ROI',
  '',
] as const;
