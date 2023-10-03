import { AccordionInfo, CheckboxData } from '../types';

const getName = (data: string) => data.toLowerCase().replaceAll('-', '');

export const mockData: AccordionInfo[] = [
  {
    id: 'strategy',
    title: 'Strategy',
    isOpened: true,
    ariaControls: 'strategy-panel',
    items: [1, 2, 3, 4, 5].map((number) => ({
      key: `strategy-checkbox${number}`,
      name: `checkbox${number}`,
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
      name: getName(status),
      content: {
        statePath: ['status', status.toLowerCase()],
        text: status,
      },
    })),
  },
  {
    id: 'pairs',
    title: 'Pairs',
    isOpened: false,
    ariaControls: 'pairs-panel',
    isDisabled: true,
    items: [
      {
        key: `btcfdusd`,
        name: 'btcfdusd',
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
    isDisabled: true,
    items: [
      {
        key: 'binance',
        name: 'binance',
        isDisabled: true,
        content: {
          statePath: ['exchange', 'binance'],
          text: 'Binance',
        },
      },
    ],
  },
];

export const mockInitialState: CheckboxData = {
  strategy: {
    checkbox1: true,
    checkbox4: true,
  },
  status: {
    running: true,
  },
  pairs: {
    btcfdusd: true,
  },
  exchange: {
    binance: true,
  },
};
