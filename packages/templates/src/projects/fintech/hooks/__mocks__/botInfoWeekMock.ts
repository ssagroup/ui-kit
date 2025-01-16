import { Bot, StatusType } from '@/fintech/types';

export const data: Bot = {
  name: 'Test bot',
  platform: 'Binance',
  tradingAccountId: 10,
  tradingAccountName: 'Test Yevgen',
  strategy: 'Scalping',
  instrument: 'BTC/FDUSD',
  isRunning: true,
  status: 'WaitingForSignal' as StatusType,
  statusAlias: 'WaitingForSignal' as StatusType,
  statusColor: '#0B9F43',
  creationTime: '2024-06-26T07:32:29.2674655Z',
  lastRunStart: '2024-10-02T06:48:08.7326861Z',
  lastRunEnd: null,
  lastRunDurationTimestamp: 2839,
  lastRunDuration: '00:47:19',
  uptimeDurationTimestamp: 2839,
  uptimeDuration: '00:47:19',
  lastOrderDate: '2024-10-02T07:32:24Z',
  statistics: {
    coinForBalance: 'USDT',
    roi: -5.55,
    pnl: -2931.67,
    pnlUp: false,
    hourlyPnl: -117.27,
    turnover: 2820116,
    orders: 7359,
    matchedOrders: 0,
    errors: 0,
    runs: 988,
    noControlOrdersCount: 0,
    noControlOrdersSize: 0,
    noControlOrdersPnl: 0,
    commission: 0,
    pnlInvestment: -198.16,
    pnlInvestmentUp: true,
    pnlTotal: -3129.83,
    pnlTotalUp: false,
    roiInvestment: -0.37,
    roiTotal: -5.92,
  },
  mobileStatistics: null,
  lastOrderDurationTimestamp: 183,
  lastOrderDuration: '00:03:03',
  isActionsDisabled: false,
  formattedOrderSize: '0.0003 (x3.33)',
  lastStatusUpdate: '2024-10-02T07:26:27.9593851Z',
  lastNotificationTime: null,
  lastNotificationTitle: null,
  lastNotificationText: null,
  averageOrderSize: 724.22,
  currentlyInUsePercents: 82,
  maxInWorkPercents: 86,
  isLastVersion: false,
  buildNumber: '20240903.2',
  maxInWork: 45396.54,
  currentInWork: 43515.2,
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