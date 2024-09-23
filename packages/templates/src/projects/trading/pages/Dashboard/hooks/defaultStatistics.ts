export const defaultStatistics = {
  result: {
    exchangesCount: null,
    accountsCount: null,
    allOrders: null,
    turnover: null,
    pnl: null,
    pnlUp: null,
    roi: null,
    errorsCount: null,
    allBotsCount: null,
    runningBotsCount: null,
    balance: {
      balanceTo: null,
      total: null,
      free: null,
      otherCoinsCount: null,
      otherCoinsPrice: null,
      coins: [],
    },
    maxInWork: {
      maxInWork: null,
      maxInWorkPercents: null,
    },
    positions: {
      profitPositions: null,
      profitPositionsPercent: null,
      lossPositions: null,
      lossPositionsPercents: null,
    },
    hourlyPnlStatistic: {
      last: null,
      minimum: null,
      maximum: null,
      average: null,
    },
    profitabilityStatistic: {
      profit: null,
      profitPercents: null,
      loss: null,
      lossPercents: null,
    },
    noControlStatistic: {
      allOrdersCount: null,
      allOrdersSize: null,
      currentPnl: null,
    },

    marketRolesStatistic: {
      roleMaker: null,
      roleMakerPercents: null,
      roleTaker: null,
      roleTakerPercents: null,
      roleMakerCost: null,
      roleMakerCostPercents: null,
      roleTakerCost: null,
      roleTakerCostPercents: null,
    },

    fundsInNoControls: {
      longFunds: null,
      longFundsPercents: null,
      shortFunds: null,
      shortFundsPercents: null,
      total: null,
      totalPercents: null,
    },
    fundsInPlacedOrders: {
      longFunds: null,
      longFundsPercents: null,
      shortFunds: null,
      shortFundsPercents: null,
      total: null,
      totalPercents: null,
    },
  },
  targetUrl: null,
  success: true,
  error: null,
  unAuthorizedRequest: false,
};

export const defaultGraphStatistics = {
  result: {
    data: [],
    aggregationPeriod: 'Hourly',
    weightedPriceData: {
      data: [],
      aggregationPeriod: 'Hourly',
    },
  },
  targetUrl: null,
  success: true,
  error: null,
  unAuthorizedRequest: false,
};
