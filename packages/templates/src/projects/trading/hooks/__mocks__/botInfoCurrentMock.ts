import { Bot, StatusType } from '@/trading/types';

export const data: Bot = {
  name: 'Test bot',
  platform: 'Binance',
  tradingAccountId: 10,
  tradingAccountName: 'Test Yevgen',
  strategy: 'GridRebalancingV6',
  instrument: 'BTC/FDUSD',
  isRunning: true,
  status: 'Trading' as StatusType,
  statusAlias: 'Trading' as StatusType,
  statusColor: '#0B9F43',
  creationTime: '2024-06-26T07:32:29.2674655Z',
  lastRunStart: '2024-10-02T06:48:08.7326861Z',
  lastRunEnd: null,
  lastRunDurationTimestamp: 3200,
  lastRunDuration: '00:53:20',
  uptimeDurationTimestamp: 3200,
  uptimeDuration: '00:53:20',
  lastOrderDate: '2024-10-02T07:36:28Z',
  statistics: {
    coinForBalance: 'USDT',
    roi: -5.53,
    pnl: -2922.42,
    pnlUp: false,
    hourlyPnl: -112.4,
    turnover: 76115,
    orders: 384,
    matchedOrders: 0,
    errors: 0,
    runs: 988,
    noControlOrdersCount: 0,
    noControlOrdersSize: 0,
    noControlOrdersPnl: 0,
    commission: 0,
    pnlInvestment: -189.49,
    pnlInvestmentUp: true,
    pnlTotal: -3111.91,
    pnlTotalUp: false,
    roiInvestment: -0.36,
    roiTotal: -5.89,
  },
  mobileStatistics: null,
  lastOrderDurationTimestamp: 301,
  lastOrderDuration: '00:05:01',
  isActionsDisabled: false,
  formattedOrderSize: '0.0003 (x3.33)',
  lastStatusUpdate: '2024-10-02T07:36:28.5768375Z',
  lastNotificationTime: null,
  lastNotificationTitle: null,
  lastNotificationText: null,
  averageOrderSize: 718.07,
  currentlyInUsePercents: 82,
  maxInWorkPercents: 81,
  isLastVersion: false,
  buildNumber: '20240903.2',
  maxInWork: 42649.91,
  currentInWork: 43570.75,
  weightedAssetPrice: 61759.05,
  weightedAssetBuyPrice: 61759.05,
  weightedAssetSellPrice: 61659.17,
  weightedAssetBuyVolume: 0.28353,
  weightedAssetSellVolume: 52939.95,
  id: 20,
  baseCurrency: '',
  quoteCurrency: '',
  start: '',
  uptimeTimestamp: 3267,
};
