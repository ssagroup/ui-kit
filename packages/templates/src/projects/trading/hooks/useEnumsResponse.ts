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
    ],
    colorsForBotStatuses: [
      {
        styles: {
          backgroundColor: '#ECFDF3',
          fontColor: '#0B9F43',
        },
        key: 'Running',
        localizedName: 'Trading',
      },
      {
        styles: {
          backgroundColor: '#FFEFEC',
          fontColor: '#E5350E',
        },
        key: 'Stopped',
        localizedName: 'Stopped',
      },
    ],
    exchangePlatforms: [
      {
        key: 'Binance',
        localizedName: 'Binance',
      },
      {
        key: 'ByBit',
        localizedName: 'ByBit',
      },
    ],
  },
});
