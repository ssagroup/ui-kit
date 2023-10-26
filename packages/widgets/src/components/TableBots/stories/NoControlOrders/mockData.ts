import { NoControlOrdersItem } from '@components/TableBots/types';

const commonStructure: NoControlOrdersItem = {
  id: 1,
  exchange: 'binance',
  account: 'Yevgen 2',
  botName: 'bot1',
  botRun: 'New Run - 12/8/2023',
  orderId: '1A2B3C',
  status: true,
  reason: 'Less than minute ago',
  pair: 'BTC/TUSD',
  orderSize: '0.003 BTC',
  orderType: 'SELL',
  isDisabled: false,
};

export const noControlOrdersData = new Array(10)
  .fill(null)
  .map((value, index) => ({
    ...commonStructure,
    id: index + 1,
  }));
