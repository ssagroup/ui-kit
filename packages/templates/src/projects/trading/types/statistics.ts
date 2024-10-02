import {
  PERIOD_DAY,
  PERIOD_WEEK,
  PERIOD_MONTH,
  PERIOD_YEAR,
  PERIOD_ALL_TIME,
  PERIOD_CURRENT,
  PERIOD_CUSTOM,
} from '../constants';
import { MarketRolesProps } from '@trading/components/MarketRoles/types';
import { CurrentFundsProps } from '@trading/components';
import { Balance } from './account';

export type StatisticsPeriod =
  | typeof PERIOD_CURRENT
  | typeof PERIOD_DAY
  | typeof PERIOD_WEEK
  | typeof PERIOD_MONTH
  | typeof PERIOD_YEAR
  | typeof PERIOD_ALL_TIME
  | typeof PERIOD_CUSTOM;

export type PeriodRange = {
  start: Date;
  end: Date;
};

export type RequestPeriod = {
  period: StatisticsPeriod;
  periodRange?: PeriodRange;
};

export type NoControlOrdersStatProps = {
  allOrdersCount: number;
  allOrdersSize: number;
  currentPnl: number;
  buyWeightedPrice: number;
  sellWeightedPrice: number;
};

export type WeightedMeanPrices = {
  instrument: string;
  platform: string;
  weightedAssetBuyPrice?: number;
  weightedAssetSellPrice?: number;
};

export type Statistics = {
  exchangesCount: number;
  accountsCount: number;
  allOrders: number;
  turnover: number;
  pnl: number;
  pnlUp?: boolean | null;
  roi: number;
  errorsCount: number;
  allBotsCount: number;
  runningBotsCount: number;
  balance: Balance;
  maxInWork: {
    maxInWork: number;
    maxInWorkPercents: number;
  };
  positions: {
    profitPositions: number;
    profitPositionsPercent: number;
    lossPositions: number;
    lossPositionsPercents: number;
  };
  hourlyPnlStatistic: {
    last: number;
    minimum: number;
    maximum: number;
    average: number;
  };
  profitabilityStatistic: {
    profit: number;
    profitPercents: number;
    loss: number;
    lossPercents: number;
  };
  noControlStatistic: NoControlOrdersStatProps;
  marketRolesStatistic: MarketRolesProps;
  fundsInNoControls: CurrentFundsProps;
  fundsInPlacedOrders: CurrentFundsProps;
  weightedMeanPrices: WeightedMeanPrices[];
  commission: number;
  pnlInvestment: number;
  pnlInvestmentUp?: boolean | null;
  pnlTotal: number;
  pnlTotalUp?: boolean | null;
  roiInvestment: number;
  roiTotal: number;
  turnoverRatio: {
    totalTurnover: string;
    makerTurnover: string;
    totalTurnoverRatio: number;
    makerTurnoverRatio: number;
  };
};

export type RebalancingItemKeys =
  | 'sold'
  | 'bought'
  | 'sellOrders'
  | 'buyOrders';

export type RebalancingDashboardItemKeys = 'buyingBotNames' | 'sellingBotNames';

export type RebalancingItem = {
  [key in RebalancingItemKeys]: number;
} & {
  [key in RebalancingDashboardItemKeys]?: Array<string>;
} & {
  buyingBotNamesMarkup?: string;
  sellingBotNamesMarkup?: string;
};

export type BalanceHistoryItem = {
  botAccountBalance: number;
  baseAssetPrice: number;
};

export type BotKeeperRunsItem = {
  botName: string;
  runs: number;
  failures: number;
  serviceOperations: number;
};

export type KeeperRunsItem = {
  totalRuns: number;
  failures: number;
  serviceOperations: number;
  botRuns: BotKeeperRunsItem[];
};

export type GraphsListItem = {
  timestamp: string;
  allOrders: number;
  matchedOrders: number;
  pnl: number;
  pnlFromInitial: null;
  cumulativePNL: number;
  turnover: number;
  rebalancing: RebalancingItem;
  keeperRuns: KeeperRunsItem;
  balanceHistory?: BalanceHistoryItem;
  isEmpty?: 0 | 1;
  baseCommission: number;
  quoteCommission: number;
  alternateCommission?: number | null;
  baseCommissionEquivalent: number;
  quoteCommissionEquivalent: number;
  alternateCommissionEquivalent?: number | null;
  totalCommissionEquivalent: number;
  alternateCommissionAsset?: string | null;
  pnlInvestment: number;
  cumulativePnlInvestment: number;
  pnlTotal: number;
  cumulativePnlTotal: number;
};

export type WeightedPrice = {
  baseAssetMarketPrice: number;
  baseAssetWeightedMeanPrice: number;
  baseCoinCount: number;
  baseCoinPrice: number;
  quoteCoinCount: number;
  quoteCoinPrice: number;
};

export type WeightedPriceItem = {
  timestamp: string;
  weightedPrice: Record<
    | 'baseAssetMarketPrice'
    | 'baseAssetWeightedMeanPrice'
    | 'baseCoinCount'
    | 'baseCoinPrice'
    | 'quoteCoinCount'
    | 'quoteCoinPrice',
    number
  >;
};

export type WeightedPriceItemNonNullable = {
  timestamp: string;
  weightedPrice: Record<
    | 'baseAssetMarketPrice'
    | 'baseAssetWeightedMeanPrice'
    | 'baseCoinCount'
    | 'baseCoinPrice'
    | 'quoteCoinCount'
    | 'quoteCoinPrice'
    | 'sumCoin'
    | 'sumPrice',
    number
  >;
};

export interface GraphStatistics {
  aggregationPeriod: string;
  data: Array<GraphsListItem>;
}

export interface GraphStatisticsWeighted extends GraphStatistics {
  weightedPriceData: {
    aggregationPeriod: string;
    data: Array<WeightedPriceItem>;
  };
}
