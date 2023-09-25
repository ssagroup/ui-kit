export const mockData: {
  id: string;
  title: string;
  isOpened: boolean;
  ariaControls: string;
  items: {
    key: string;
    isDisabled?: boolean;
    content: {
      statePath: string[];
      text: string;
    };
  }[];
}[] = [
  {
    id: 'strategy',
    title: 'Strategy',
    isOpened: true,
    ariaControls: 'strategy-panel',
    items: [1, 2, 3, 4, 5].map((number) => ({
      key: `strategy-checkbox${number}`,
      content: {
        statePath: ['strategy', `checkbox${number}`],
        text: `checkbox${number}`,
      },
    })),
  },
  {
    id: 'status',
    title: 'Status',
    isOpened: false,
    ariaControls: 'status-panel',
    items: ['Running', 'Stopped'].map((status) => ({
      key: `status-checkbox-${status}`,
      content: {
        statePath: ['status', `checkbox${status.toLowerCase()}`],
        text: status,
      },
    })),
  },
  {
    id: 'pairs',
    title: 'Pairs',
    isOpened: false,
    ariaControls: 'pairs-panel',
    items: [
      {
        key: `btcfdusd`,
        isDisabled: true,
        content: {
          statePath: ['pairs', 'btcfdusd'],
          text: 'BTC-FDUSD',
        },
      },
    ],
  },
  {
    id: 'exchange',
    title: 'Exchange',
    isOpened: false,
    ariaControls: 'exchange-panel',
    items: [
      {
        key: `binance`,
        isDisabled: true,
        content: {
          statePath: ['exchange', 'binance'],
          text: 'Binance',
        },
      },
    ],
  },
];
