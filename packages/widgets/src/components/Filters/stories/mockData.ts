import { TableFilterConfig } from '@components/TableFilters/types';

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
  strategy2: {
    id: 'strategy2',
    title: 'Strategy #2',
    isOpened: false,
    ariaControls: 'strategy2-panel',
    selectedItems: ['strategy2Checkbox1'],
    items: {
      strategy2Checkbox1: {
        key: 'strategy2-checkbox1',
        name: 'strategy2Checkbox1',
        content: {
          statePath: ['strategy', 'items', 'strategy2Checkbox1'],
          text: 'strategy #2 checkbox1',
        },
      },
      strategy2Checkbox2: {
        key: 'strategy2-checkbox2',
        name: 'strategy2Checkbox2',
        content: {
          statePath: ['strategy', 'items', 'strategy2Checkbox2'],
          text: 'strategy #2 checkbox2',
        },
      },
      strategy2Checkbox3: {
        key: 'strategy2-checkbox3',
        name: 'strategy2Checkbox3',
        content: {
          statePath: ['strategy', 'items', 'strategy2Checkbox3'],
          text: 'strategy #2 checkbox3',
        },
      },
      strategy2Checkbox4: {
        key: 'strategy2-checkbox4',
        name: 'strategy2Checkbox4',
        content: {
          statePath: ['strategy', 'items', 'strategy2Checkbox4'],
          text: 'strategy #2 checkbox4',
        },
      },
      strategy2Checkbox5: {
        key: 'strategy2-checkbox5',
        name: 'strategy2Checkbox5',
        content: {
          statePath: ['strategy', 'items', 'strategy2Checkbox5'],
          text: 'strategy #2 checkbox5',
        },
      },
    },
  },
  strategy3: {
    id: 'strategy3',
    title: 'Strategy #3',
    isOpened: false,
    ariaControls: 'strategy3-panel',
    selectedItems: [],
    items: {
      strategy3Checkbox1: {
        key: 'strategy3-checkbox1',
        name: 'strategy3Checkbox1',
        content: {
          statePath: ['strategy', 'items', 'strategy3Checkbox1'],
          text: 'strategy #3 checkbox1',
        },
      },
      strategy3Checkbox2: {
        key: 'strategy3-checkbox2',
        name: 'strategy3Checkbox2',
        content: {
          statePath: ['strategy', 'items', 'strategy3Checkbox2'],
          text: 'strategy #3 checkbox2',
        },
      },
      strategy3Checkbox3: {
        key: 'strategy3-checkbox3',
        name: 'strategy3Checkbox3',
        content: {
          statePath: ['strategy', 'items', 'strategy3Checkbox3'],
          text: 'strategy #3 checkbox3',
        },
      },
      strategy3Checkbox4: {
        key: 'strategy3-checkbox4',
        name: 'strategy3Checkbox4',
        content: {
          statePath: ['strategy', 'items', 'strategy3Checkbox4'],
          text: 'strategy #3 checkbox4',
        },
      },
      strategy3Checkbox5: {
        key: 'strategy3-checkbox5',
        name: 'strategy3Checkbox5',
        content: {
          statePath: ['strategy', 'items', 'strategy3Checkbox5'],
          text: 'strategy #3 checkbox5',
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
