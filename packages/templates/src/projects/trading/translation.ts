import { JSONObject } from '../../types';

export const translationConfig: JSONObject = {
  en: {
    buttons: {
      copy: 'Copy',
      delete: 'Delete',
    },
    rowsPerPage: {
      text: 'Rows per page',
    },
    common: {
      noDataYet: 'No data yet',
    },
    positions: {
      title: 'Positions',
      profit: 'profit',
      loss: 'loss',
    },
    profitability: {
      title: 'Profitability',
      profit: 'profit',
      loss: 'loss',
    },
    'max-in-work': {
      title: 'Max in Work',
      balance: 'of your balance',
    },
    balance: {
      title: 'Balance',
      sync: 'Sync',
      revert: 'Revert',
      loading: 'Loading...',
      disabled: 'Disabled: ',
    },
    hourlyPNL: {
      title: 'Hourly PNL',
      labelTitle: 'for last hour',
      minimum: 'Min',
      average: 'Avg',
      maximum: 'Max',
    },
    bots: {
      title: 'Bots',
      running: 'Running',
      all: 'All',
    },
    notificationMenu: {
      unread: 'Unread',
      all: 'All',
      'view-all': 'View all notifications',
      noUnreadMessage: 'You don’t have unread notifications now!',
    },
    'market-roles': {
      title: 'Market Roles',
      makers: 'makers',
      takers: 'takers',
    },
    orders: {
      title: 'Orders',
      number: 'Number',
      all: 'All',
      matched: 'Matched',
    },
    pnl: {
      title: 'PNL',
      totalText: 'Total',
      tradingText: 'Trading',
      investmentText: 'Investment',
    },
    rebalance: {
      title: 'Rebalance',
      orders: 'Orders',
      bots: 'Bots',
    },
    keeperRuns: {
      title: 'Keeper Runs',
      number: 'Number',
      runs: 'Runs',
      bots: 'Bots',
      failures: 'Failures',
      serviceOperations: 'Service operations',
    },
    'cumulative-pnl': {
      title: 'Cumulative PNL',
      totalText: 'Total',
      tradingText: 'Trading',
      investmentText: 'Investment',
    },
    turnover: {
      title: 'Turnover',
    },
    'no-control-orders': {
      title: 'No Control Orders',
      count: 'Count of all orders',
      pnlForNow: 'PNL for now',
      size: 'Size of all orders',
      weightedMeanNCPrices: 'Weighted mean NC prices',
      buyOrders: 'Buy orders',
      sellOrders: 'Sell orders',
    },
    'cryptocurrency-prices': {
      title: 'Cryptocurrency Prices',
      weightedMeanPrice: 'Weighted mean prices',
    },
    'cryptocurrency-prices-volumes': {
      title: 'Prices',
      weightedMeanPrice: 'Weighted mean',
      volume: 'Volume',
    },
    fundsInPlacedOrders: {
      title: 'Current funds in work \n(placed orders)',
    },
    turnoverRatio: {
      title: 'Turnover ratio',
      total: 'Total',
      maker: 'Maker',
    },
    balanceVsPrice: {
      title: 'Balance vs Price',
      accountBalance: 'Account balance',
      priceOf: 'Price of ',
      tooltip: {
        balance: 'Balance',
        price: 'Price',
      },
    },
    priceVolatility: {
      title: 'Price vs Volatility for last hour',
      price: 'Price',
      volatility: 'Volatility',
    },
    weightedAveragePrice: {
      title: 'Weighted average price of assets',
      tooltip: {
        baseBalance: 'Base balance',
        quoteBalance: 'Quote balance',
        priceOfBase: 'Price of base',
        weightedMeanPriceOfAssets: 'Weighted mean price of assets',
        weightedMeanAssetPrice: 'Weighted mean asset price',
      },
    },
    pages: {
      dashboard: {
        pageTitle: 'Dashboard - SSA CTP: Crypto Trading Platform',
        crumbs: 'Dashboard',
        periodFilter: {
          current: 'Current',
          '24h': '24h',
          '7d': '7d',
          '30d': '30d',
          '1y': '1y',
          all: 'All',
          custom: 'Custom',
          customButtons: {
            apply: 'Apply',
            cancel: 'Cancel',
          },
        },
        scoreboard: {
          exchange: 'Exchange',
          exchanges: 'Exchanges',
          account: 'Account',
          accounts: 'Accounts',
          order: 'Order',
          orders: 'Orders',
          error: 'Error',
          errors: 'Errors',
          commission: 'Commission',
          pnlTrading: 'PNL trading',
          pnlInvestment: 'PNL investment',
          pnlTotal: 'PNL total',
          roiTrading: 'ROI trading',
          roiInvestment: 'ROI investment',
          roiTotal: 'ROI total',
        },
      },
      notifications: {
        pageTitle: 'Notifications - SSA CTP: Crypto Trading Platform',
        crumbs: 'Notifications',
        readAllBtnText: 'Mark all as read',
        allFilterText: 'All',
        unreadFilterText: 'Last %Unread',
        noItemsMsg: 'You don’t have notifications now!',
        noUnreadItemsMsg: 'You don’t have unread notifications now!',
      },
      bots: {
        buttonGroup: {
          all: 'All',
          running: 'Running',
          stopped: 'Stopped',
        },
        table: {
          noResults: 'No results!',
          allTitle: 'Bots',
          archiveTitle: 'Bots Archive',
          lastStatusChange: 'Last Status change:',
          lastOrderTime: 'Last order time: ',
          notAvailable: 'N/A',
          columns: {
            name: 'Name',
            strategy: 'Strategy',
            funds: 'Funds in Work',
            creationDate: 'Created At',
            exchange: 'Exchange',
            status: 'Status',
            pnl: 'PNL trading',
            roi: 'ROI trading',
          },
        },
      },
    },
  },
};
