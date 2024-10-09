export const useEnumsResponse = () => ({
  result: {
    botStrategies: [
      {
        key: 'Grid',
        localizedName: 'Grid',
      },
      {
        key: 'Fibonacci',
        localizedName: 'Fibonacci',
      },
      {
        key: 'Cross',
        localizedName: 'Cross',
      },
      {
        key: 'Rebalancing',
        localizedName: '[Strategy.Rebalancing]',
      },
      {
        key: 'GridRebalancing',
        localizedName: '[Strategy.Grid rebalancing]',
      },
      {
        key: 'GridRebalancingV2',
        localizedName: '[Strategy.Grid rebalancing v2]',
      },
      {
        key: 'GridRebalancingV3',
        localizedName: '[Strategy.Grid rebalancing v3]',
      },
      {
        key: 'GridRebalancingV4',
        localizedName: '[Strategy.Grid rebalancing v4]',
      },
      {
        key: 'GridRebalancingV5',
        localizedName: '[Strategy.Grid rebalancing v5]',
      },
      {
        key: 'GridRebalancingV6',
        localizedName: '[Strategy.Grid rebalancing v6]',
      },
    ],
    colorsForBotStatuses: [
      {
        styles: {
          backgroundColor: '#ECFDF3',
          fontColor: '#0B9F43',
        },
        key: 'Initializing',
        localizedName: 'Initializing',
      },
      {
        styles: {
          backgroundColor: '#ECFDF3',
          fontColor: '#0B9F43',
        },
        key: 'WarmingUp',
        localizedName: 'WarmingUp',
      },
      {
        styles: {
          backgroundColor: '#ECFDF3',
          fontColor: '#0B9F43',
        },
        key: 'Trading',
        localizedName: 'Trading',
      },
      {
        styles: {
          backgroundColor: '#ECFDF3',
          fontColor: '#0B9F43',
        },
        key: 'WaitingForSignal',
        localizedName: 'WaitingForSignal',
      },
      {
        styles: {
          backgroundColor: '#FFEFEC',
          fontColor: '#E5350E',
        },
        key: 'StopLossing',
        localizedName: 'StopLossing',
      },
      {
        styles: {
          backgroundColor: '#FFEFEC',
          fontColor: '#E5350E',
        },
        key: 'StopLossPending',
        localizedName: 'StopLossPending',
      },
      {
        styles: {
          backgroundColor: '#FFEFEC',
          fontColor: '#E5350E',
        },
        key: 'Stopped',
        localizedName: 'Stopped',
      },
      {
        styles: {
          backgroundColor: '#FFEFEC',
          fontColor: '#E5350E',
        },
        key: 'Failed',
        localizedName: 'Failed',
      },
      {
        styles: {
          backgroundColor: '#FFEFEC',
          fontColor: '#E5350E',
        },
        key: 'StartFailed',
        localizedName: 'StartFailed',
      },
      {
        styles: {
          backgroundColor: '#ECFDF3',
          fontColor: '#0B9F43',
        },
        key: 'Rebalancing->WarmingUp',
        localizedName: 'Rebalancing->WarmingUp',
      },
      {
        styles: {
          backgroundColor: '#ECFDF3',
          fontColor: '#0B9F43',
        },
        key: 'Rebalancing->Active',
        localizedName: 'Rebalancing->Active',
      },
      {
        styles: {
          backgroundColor: '#FFEFEC',
          fontColor: '#E5350E',
        },
        key: 'Rebalancing->Stopping',
        localizedName: 'Rebalancing->Stopping',
      },
      {
        styles: {
          backgroundColor: '#FFEFEC',
          fontColor: '#E5350E',
        },
        key: 'Rebalancing->Stopped',
        localizedName: 'Rebalancing->Stopped',
      },
    ],
    exchangePlatforms: [
      {
        key: 'Binance',
        localizedName: 'Binance',
      },
      {
        key: 'Bybit',
        localizedName: 'Bybit',
      },
    ],
    pairs: [
      {
        key: 'BTC/FDUSD',
        localizedName: 'BTC/FDUSD',
      },
      {
        key: 'ETH/FDUSD',
        localizedName: 'ETH/FDUSD',
      },
      {
        key: 'BTC/USDT',
        localizedName: 'BTC/USDT',
      },
    ],
    colorsForLastOrder: [
      {
        value: {
          period: [
            {
              upToHours: 0.25,
              value: ['#89D996', '#52C587'],
            },
            {
              upToHours: 2,
              value: ['#EDBA5D', '#EDDF5D'],
            },
            {
              upToHours: 4,
              value: ['#ECAA5C', '#ECBB5C'],
            },
          ],
          higher: ['#F0816B', '#F99990'],
        },
        key: 'Grid',
        localizedName: 'Grid',
      },
      {
        value: {
          period: [
            {
              upToHours: 0.25,
              value: ['#89D996', '#52C587'],
            },
            {
              upToHours: 2,
              value: ['#EDBA5D', '#EDDF5D'],
            },
            {
              upToHours: 4,
              value: ['#ECAA5C', '#ECBB5C'],
            },
          ],
          higher: ['#F0816B', '#F99990'],
        },
        key: 'GridRebalancing',
        localizedName: 'GridRebalancing',
      },
      {
        value: {
          period: [
            {
              upToHours: 0.25,
              value: ['#89D996', '#52C587'],
            },
            {
              upToHours: 2,
              value: ['#EDBA5D', '#EDDF5D'],
            },
            {
              upToHours: 4,
              value: ['#ECAA5C', '#ECBB5C'],
            },
          ],
          higher: ['#F0816B', '#F99990'],
        },
        key: 'GridRebalancingV2',
        localizedName: 'GridRebalancingV2',
      },
      {
        value: {
          period: [
            {
              upToHours: 0.25,
              value: ['#89D996', '#52C587'],
            },
            {
              upToHours: 2,
              value: ['#EDBA5D', '#EDDF5D'],
            },
            {
              upToHours: 4,
              value: ['#ECAA5C', '#ECBB5C'],
            },
          ],
          higher: ['#F0816B', '#F99990'],
        },
        key: '_Default',
        localizedName: '_Default',
      },
    ],
  },
});
