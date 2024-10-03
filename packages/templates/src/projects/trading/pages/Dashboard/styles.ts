import styled from '@emotion/styled';
import { WidgetsLayoutTemplate } from '@trading/components';

export const WidgetLayoutDashboard = styled(WidgetsLayoutTemplate)`
  grid-template-rows: repeat(12, 215px);
  grid-template-areas:
    'balance balance'
    'max max'
    'funds-place-order roles'
    'hourly bots'
    'weighted-mean-prices-btc weighted-mean-prices-eth'
    'orders orders'
    'turnover turnover'
    'pnl pnl'
    'cumulative cumulative'
    'rebalancing rebalancing'
    'positions profitability'
    'keeper-runs keeper-runs';

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns:
      calc(36% - 7px)
      calc(14% - 7px)
      calc(25% - 7px)
      calc(25% - 7px);
    grid-template-rows: repeat(6, 215px);
    grid-template-areas:
      'balance max funds-place-order roles'
      'hourly bots weighted-mean-prices-btc weighted-mean-prices-eth'
      'orders orders pnl pnl'
      'turnover turnover cumulative cumulative'
      'rebalancing rebalancing positions profitability'
      'keeper-runs keeper-runs . .';
    margin-bottom: 20px;
  }
`;
