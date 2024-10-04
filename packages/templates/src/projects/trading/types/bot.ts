import { HistoryBot } from './historyBot';

export interface Bot {
  id: number;
  name: string;
  platform: PlatformType;
  tradingAccountId: number;
  tradingAccountName: string | null;
  strategy: string | null;
  instrument: string | null;
  isRunning: boolean;
  status: StatusType;
  statusAlias?: StatusType;
  statusColor: string | null;
  creationTime: string;
  lastRunStart: string | null;
  lastRunEnd: string | null;
  start: string;
  uptimeTimestamp: number;
  uptimeDuration: string;
  lastRunDurationTimestamp: number;
  lastRunDuration: string | null;
  lastOrderDate: string | null;
  lastOrderDurationTimestamp: number;
  lastOrderDuration: string | null;
  lastStatusUpdate: string | null;
  isActionsDisabled: boolean;
  statistics: BotStatistics;
  currentlyInUsePercents: number | null;
  averageOrderSize: number | null;
  isLastVersion: boolean;
  buildNumber: string;
  weightedAssetPrice: number;
  weightedAssetBuyPrice: number;
  weightedAssetSellPrice: number;
  weightedAssetBuyVolume: number;
  weightedAssetSellVolume: number;
  baseCurrency: string;
  quoteCurrency: string;
  uptimeDurationTimestamp: number;
  mobileStatistics: null;
  formattedOrderSize: string;
  lastNotificationTime: null;
  lastNotificationTitle: null;
  lastNotificationText: null;
  maxInWorkPercents: number;
  maxInWork: number;
  currentInWork: number;
}

export interface BotStatistics {
  roi: number;
  pnl: number;
  pnlUp: boolean | null;
  hourlyPnl: number;
  turnover: number;
  orders: number;
  errors: number;
  runs: number;
  coinForBalance: string;
  matchedOrders: number;
  noControlOrdersCount: number;
  noControlOrdersSize: number;
  noControlOrdersPnl: number;
  commission: number;
  pnlInvestment: number;
  pnlInvestmentUp: boolean | null;
  pnlTotal: number;
  pnlTotalUp: boolean | null;
  roiInvestment: number;
  roiTotal: number;
}

export type PlatformType = 'Binance' | 'ByBit' | null;

export interface PlatformProps {
  exchangeType: PlatformType;
  showTitle?: boolean;
}

export type StatusType =
  | 'Initializing'
  | 'LiquidationInProgress'
  | 'LiquidationPending'
  | 'NoTrade'
  | 'Stopped'
  | 'Trade'
  | 'WarmUp';

export interface BotConfiguration {
  configuration?: string;
  rebalancingStrategyConfiguration?: string;
  rebalancingConditionConfiguration?: string;
  minPrice: number;
  maxPrice: number;
  baseAssetBalance: number;
  quoteAssetBalance: number;
  baseAssetEquivalent: number | null;
  instrument?: string | null;
  initialBasePrice: number | null;
  upperRebalanceTrigger: number | null;
  lowerRebalanceTrigger: number | null;
  noControlBaseRebalanceTrigger: number | null;
  noControlTotalRebalanceTrigger: number | null;
  overbuyPercentage: number | null;
  oversellPercentage: number | null;
  overbuyMarginPoints: number | null;
  oversellMarginPoints: number | null;
  disbalancePeriodMinutes: number | null;
  rebalancingConditionWeightedMeanMargin: number | null;
  rebalancingConditionVolatilityThreshold: number | null;
  rebalancingConditionWeightedMeanSpreadOverThreshold: number | null;
  weightMean: number | null;
  weightMeanVolume: number | null;
  weightMeanSell: number | null;
  weightMeanVolumeSell: number | null;
}

export interface BotCreateConfiguration extends BotConfiguration {
  name: string;
  platform: string;
  strategy: string;
  tradingAccountId: string;
}

export interface HistoryConfig {
  configuration: BotConfiguration;
  minPrice: number;
  maxPrice: number;
  baseAssetBalance: number;
  quoteAssetBalance: number;
}

export type BotListItem = Pick<Bot, 'id' | 'name'>;
export type BotRunListItem = Pick<HistoryBot, 'id' | 'reason' | 'start'>;

export interface BotBalanceCoin {
  coinName: string;
  coinCount: number;
}

export interface BotBasePrice {
  instrument: string;
  basePrice: number;
}

export interface BotBalance {
  coins: BotBalanceCoin[];
  basePrices: BotBasePrice[];
}
