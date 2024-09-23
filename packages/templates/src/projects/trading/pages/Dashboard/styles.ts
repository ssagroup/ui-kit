import styled from '@emotion/styled';
import { WidgetsLayoutTemplate } from '@trading/components';

export const WidgetLayoutDashboard = styled(WidgetsLayoutTemplate)`
  grid-template-rows: repeat(14, 215px);
  grid-template-areas:
    'balance balance'
    'max max'
    'funds-place-order turnover-ratio'
    'hourly bots'
    'weighted-mean-prices-btc weighted-mean-prices-eth'
    'orders orders'
    'turnover turnover'
    'pnl pnl'
    'cumulative cumulative'
    'rebalancing rebalancing'
    'positions profitability'
    'roles roles'
    'funds-no-control funds-no-control'
    'keeper-runs keeper-runs';

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns:
      calc(36% - 7px)
      calc(14% - 7px)
      calc(25% - 7px)
      calc(25% - 7px);
    grid-template-rows: repeat(7, 215px);
    grid-template-areas:
      'balance max funds-place-order turnover-ratio'
      'hourly bots weighted-mean-prices-btc weighted-mean-prices-eth'
      'orders orders pnl pnl'
      'turnover turnover cumulative cumulative'
      'rebalancing rebalancing positions profitability'
      'commission commission roles funds-no-control'
      'keeper-runs keeper-runs . .';
    margin-bottom: 20px;
  }
`;
