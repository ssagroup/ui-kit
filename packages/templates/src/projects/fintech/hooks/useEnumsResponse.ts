export const useEnumsResponse = () => ({
  result: {
    botStrategies: [
      {
        key: 'Grid1',
        localizedName: 'Grid 1.0',
      },
      {
        key: 'Grid2',
        localizedName: 'Grid 2.0',
      },
      {
        key: 'Cross',
        localizedName: 'Cross',
      },
      {
        key: 'Scalping',
        localizedName: 'Scalping',
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
