import { useTheme } from '@emotion/react';
import { Icon } from '@ssa-ui-kit/core';
import { useTranslation } from '@contexts';
import { GrowthIndexIcon } from '@trading/components';
import { Statistics } from '@trading/types';
import { USDT } from '@trading/constants';

const T_PREFIX = 'pages.dashboard.scoreboard.';
const STATISTICS_DEFAULTS = {
  exchangesCount: 0,
  accountsCount: 0,
  allOrders: 0,
  turnover: 0,
  pnl: 0,
  pnlUp: null,
  pnlInvestment: 0,
  pnlInvestmentUp: null,
  pnlTotal: 0,
  pnlTotalUp: null,
  roi: 0,
  roiInvestment: 0,
  roiTotal: 0,
  errorsCount: 0,
  balance: { balanceTo: USDT },
  commission: 0,
};

export const useScoreboardItems = (statistics?: Statistics) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const {
    exchangesCount,
    accountsCount,
    allOrders,
    turnover,
    pnl,
    pnlUp,
    pnlInvestment,
    pnlInvestmentUp,
    pnlTotal,
    pnlTotalUp,
    roi,
    roiInvestment,
    roiTotal,
    errorsCount,
    balance: { balanceTo },
    commission,
  } = statistics || STATISTICS_DEFAULTS;

  return [
    {
      value: exchangesCount,
      title: t(T_PREFIX + `exchange${exchangesCount === 1 ? '' : 's'}`),
    },
    {
      value: accountsCount,
      title: t(T_PREFIX + `account${accountsCount === 1 ? '' : 's'}`),
      link: '/settings/accounts',
    },
    {
      value: allOrders,
      title: t(T_PREFIX + `order${allOrders === 1 ? '' : 's'}`),
    },
    {
      value: turnover,
      unit: balanceTo,
      title: 'Turnover',
    },
    {
      value: errorsCount,
      title: t(T_PREFIX + `error${errorsCount === 1 ? '' : 's'}`),
    },
    {
      value: commission,
      unit: balanceTo,
      title: t(T_PREFIX + `commission`),
      icon:
        commission > 0 ? (
          <Icon size={16} name={`warning`} color={theme.colors['red']} />
        ) : undefined,
    },
    {
      value: pnl,
      unit: balanceTo,
      title: t(`${T_PREFIX}pnlTrading`),
      icon: <GrowthIndexIcon isIncreasing={pnlUp} size={16} />,
    },
    {
      value: pnlInvestment,
      unit: balanceTo,
      title: t(`${T_PREFIX}pnlInvestment`),
      icon: <GrowthIndexIcon isIncreasing={pnlInvestmentUp} size={16} />,
    },
    {
      value: pnlTotal,
      unit: balanceTo,
      title: t(`${T_PREFIX}pnlTotal`),
      icon: <GrowthIndexIcon isIncreasing={pnlTotalUp} size={16} />,
    },
    {
      value: roi,
      unit: '%',
      title: t(`${T_PREFIX}roiTrading`),
    },
    {
      value: roiInvestment,
      unit: '%',
      title: t(`${T_PREFIX}roiInvestment`),
    },
    {
      value: roiTotal,
      unit: '%',
      title: t(`${T_PREFIX}roiTotal`),
    },
  ];
};
