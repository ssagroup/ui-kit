import { TableFilterConfig } from '../types';

export const mockData: TableFilterConfig = {
  strategy: {
    id: 'strategy',
    title: 'Strategy',
    isOpened: true,
    ariaControls: 'strategy-panel',
    selectedItems: ['checkbox1', 'checkbox4'],
    items: {
      checkbox1: {
        key: 'strategy-checkbox1',
        name: 'checkbox1',
        content: {
          statePath: ['strategy', 'items', 'checkbox1'],
          text: 'checkbox1',
        },
      },
      checkbox2: {
        key: 'strategy-checkbox2',
        name: 'checkbox2',
        content: {
          statePath: ['strategy', 'items', 'checkbox2'],
          text: 'checkbox2',
        },
      },
      checkbox3: {
        key: 'strategy-checkbox3',
        name: 'checkbox3',
        content: {
          statePath: ['strategy', 'items', 'checkbox3'],
          text: 'checkbox3',
        },
      },
      checkbox4: {
        key: 'strategy-checkbox4',
        name: 'checkbox4',
        content: {
          statePath: ['strategy', 'items', 'checkbox4'],
          text: 'checkbox4',
        },
      },
      checkbox5: {
        key: 'strategy-checkbox5',
        name: 'checkbox5',
        content: {
          statePath: ['strategy', 'items', 'checkbox5'],
          text: 'checkbox5',
        },
      },
    },
  },
  status: {
    id: 'status',
    title: 'Status',
    isOpened: false,
    ariaControls: 'status-panel',
    selectedItems: ['running'],
    items: {
      running: {
        key: 'status-checkbox-running',
        name: 'running',
        content: {
          statePath: ['status', 'items', 'running'],
          text: 'Running',
        },
      },
      stopped: {
        key: 'status-checkbox-stopped',
        name: 'stopped',
        content: {
          statePath: ['status', 'items', 'stopped'],
          text: 'Stopped',
        },
      },
    },
  },
  pairs: {
    id: 'pairs',
    title: 'Pairs',
    isOpened: false,
    ariaControls: 'pairs-panel',
    selectedItems: ['btcfdusd'],
    items: {
      btcfdusd: {
        key: 'btcfdusd',
        name: 'btcfdusd',
        isDisabled: true,
        content: {
          statePath: ['pairs', 'items', 'btcfdusd'],
          text: 'BTC-FDUSD',
        },
      },
    },
  },
  exchange: {
    id: 'exchange',
    title: 'Exchange',
    isOpened: false,
    ariaControls: 'exchange-panel',
    selectedItems: ['binance'],
    items: {
      binance: {
        key: 'binance',
        name: 'binance',
        isDisabled: true,
        content: {
          statePath: ['exchange', 'items', 'binance'],
          text: 'Binance',
        },
      },
    },
  },
};
