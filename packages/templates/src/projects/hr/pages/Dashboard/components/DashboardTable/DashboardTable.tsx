import { useTranslation } from '@ssa-ui-kit/core';

import { pathOr } from '@ssa-ui-kit/utils';

import { TradingInfoCard } from '@ssa-ui-kit/widgets';

import { useDashboardIndicators } from '@/hr/hooks/dashboard';
import { DashboardIndicators } from '@/hr/types';

import { ITEMS_PER_ROW } from './constant';
import * as S from './styled';

export const DashboardTable = () => {
  const { t } = useTranslation();
  const result = useDashboardIndicators();
  const indicators = pathOr<typeof result, DashboardIndicators['indicators']>(
    {},
    ['result', 'indicators'],
  )(result);
  const items = [
    {
      value: indicators.totalStaff,
      title: t('pages.dashboard.indicators.employees'),
    },
    {
      value: indicators.fte,
      title: t('pages.dashboard.indicators.fte'),
    },
    {
      value: indicators.utilization,
      unit: '%',
      title: t('pages.dashboard.indicators.utilization'),
    },
    {
      value: indicators.resourcesOnBench,
      title: t('pages.dashboard.indicators.onBench'),
    },
    {
      value: indicators.seniority,
      unit: '%',
      title: t('pages.dashboard.indicators.seniorityLevel'),
    },
    {
      value: indicators.tenure,
      unit: t('pages.dashboard.indicators.years'),
      title: t('pages.dashboard.indicators.employeeTenure'),
    },
    {
      value: indicators.staffTurnover,
      unit: '%',
      title: t('pages.dashboard.indicators.staffTurnover'),
    },
  ];

  return (
    <S.TradingScoreboard
      renderCard={(item, onClick) => (
        <TradingInfoCard
          value={item.value}
          unit={item.unit}
          title={item.title}
          icon={item.icon}
          link={item.link}
          onClick={() => {
            if (typeof onClick === 'function') {
              onClick(item);
            }
          }}
        />
      )}
      items={items}
      itemsPerRow={ITEMS_PER_ROW}
    />
  );
};
