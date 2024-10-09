/*
SkipCount
MaxResultCount
UnreadOnly

RunState
All
Running
Stopped

Keyword = clone

Period:
-     Current
24h   Day
7d    Week
30d   Month
1y    Year
All   AllTime

platform
Binance

strategy
Grid

status
WarmingUp

instrument
BTC/FDUSD


- use different period
- use different platform
- use different strategy
- use different status
- use different instrument
- use different RunState

- use pagination?
- use Keyword
*/
export const allBotsMock = {
  totalCount: 1,
  items: [
    {
      name: 'Clone AlexP',
      platform: 'Binance',
      tradingAccountId: 10,
      tradingAccountName: 'Test Yevgen',
      strategy: 'GridRebalancingV6',
      instrument: 'BTC/FDUSD',
      isRunning: false,
      status: 'WaitingForSignal',
      statusAlias: 'WaitingForSignal',
      statusColor: '#0B9F43',
      creationTime: '2024-06-26T07:32:29.2674655Z',
      lastRunStart: '2024-10-09T15:31:31.7926905Z',
      lastRunEnd: null,
      lastRunDurationTimestamp: 3198,
      lastRunDuration: '00:53:18',
      uptimeDurationTimestamp: 3198,
      uptimeDuration: '00:53:18',
      lastOrderDate: '2024-10-09T16:18:47Z',
      statistics: {
        coinForBalance: 'BTC',
        roi: 84,
        pnl: 0.870346,
        pnlUp: false,
        hourlyPnl: 0.000353,
        turnover: 864.8066,
        orders: 218206,
        matchedOrders: 0,
        errors: 0,
        runs: 0,
        noControlOrdersCount: 21,
        noControlOrdersSize: 0.0255,
        noControlOrdersPnl: -0.000948,
        commission: 0,
        pnlInvestment: 0.002601,
        pnlInvestmentUp: false,
        pnlTotal: 0.872946,
        pnlTotalUp: false,
        roiInvestment: 0.25,
        roiTotal: 84,
      },
      mobileStatistics: null,
      lastOrderDurationTimestamp: 363,
      lastOrderDuration: '00:06:03',
      isActionsDisabled: true,
      formattedOrderSize: null,
      lastStatusUpdate: '2024-10-09T16:16:03.6501017Z',
      lastNotificationTime: null,
      lastNotificationTitle: null,
      lastNotificationText: null,
      averageOrderSize: 0.00782,
      currentlyInUsePercents: 4.3,
      maxInWorkPercents: 280,
      isLastVersion: false,
      buildNumber: '20240903.2',
      maxInWork: 2.91309,
      currentInWork: 0.044283,
      weightedAssetPrice: 0,
      weightedAssetBuyPrice: 0,
      weightedAssetSellPrice: 0,
      weightedAssetBuyVolume: 0,
      weightedAssetSellVolume: 0,
      id: 20,
    },
    {
      name: 'Clone AlexP Copy Config tests',
      platform: 'Binance',
      tradingAccountId: 10,
      tradingAccountName: 'Test Yevgen',
      strategy: 'GridRebalancingV6',
      instrument: 'BTC/FDUSD',
      isRunning: false,
      status: 'Initializing',
      statusAlias: 'Initializing',
      statusColor: '#0B9F43',
      creationTime: '2024-09-03T10:57:56.1086967Z',
      lastRunStart: null,
      lastRunEnd: null,
      lastRunDurationTimestamp: 0,
      lastRunDuration: '0',
      uptimeDurationTimestamp: 0,
      uptimeDuration: '0',
      lastOrderDate: null,
      statistics: {
        coinForBalance: 'BTC',
        roi: 84,
        pnl: 0.875904,
        pnlUp: null,
        hourlyPnl: 0.001048,
        turnover: 0,
        orders: 0,
        matchedOrders: 0,
        errors: 0,
        runs: 0,
        noControlOrdersCount: 0,
        noControlOrdersSize: 0,
        noControlOrdersPnl: 0,
        commission: 0,
        pnlInvestment: 0.071447,
        pnlInvestmentUp: null,
        pnlTotal: 0.947351,
        pnlTotalUp: null,
        roiInvestment: 6.9,
        roiTotal: 91,
      },
      mobileStatistics: null,
      lastOrderDurationTimestamp: 0,
      lastOrderDuration: '0',
      isActionsDisabled: false,
      formattedOrderSize: null,
      lastStatusUpdate: '2024-09-03T10:57:56.1087081Z',
      lastNotificationTime: null,
      lastNotificationTitle: null,
      lastNotificationText: null,
      averageOrderSize: 0,
      currentlyInUsePercents: 0,
      maxInWorkPercents: 0,
      isLastVersion: false,
      buildNumber: '20240902.1',
      maxInWork: 0,
      currentInWork: 0,
      weightedAssetPrice: 0,
      weightedAssetBuyPrice: 0,
      weightedAssetSellPrice: 0,
      weightedAssetBuyVolume: 0,
      weightedAssetSellVolume: 0,
      id: 23,
    },
  ],
};
