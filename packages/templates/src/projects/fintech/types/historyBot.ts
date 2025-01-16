export interface HistoryBotStatistics {
  coinForBalance?: string;
  roi: number;
  pnl: number;
  pnlUp: boolean | null;
  hourlyPnl: number;
  turnover: number;
  orders: number;
  matchedOrders: number;
  errors: number;
  runs: number;
  noControlOrdersCount: number;
  noControlOrdersSize: number;
  noControlOrdersPnl: number;
}

export interface HistoryBot {
  id: number;
  botId: number;
  isRunning: boolean;
  uptimeTimestamp: number;
  uptimeDuration: string | null;
  reason: string | null;
  status: string | null;
  statistics: HistoryBotStatistics;
  start: string;
  startBaseCoinCount: number | null;
  startBaseToQuotePrice: number | null;
  startQuoteCoinCount: number | null;
  endBaseCoinCount: number | null;
  endBaseToQuotePrice: number | null;
  endQuoteCoinCount: number | null;
  idlePnl: number | null | undefined;
  idlePnlInvestment: number | null | undefined;
  idlePnlTotal: number | null | undefined;
  idleRoi: number | null | undefined;
  idleRoiInvestment: number | null | undefined;
  idleRoiTotal: number | null | undefined;
  idleTime: string | null | undefined;
  idleTimestamp: number | null | undefined;
}
