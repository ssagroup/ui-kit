import {
  PERIOD_ALL_TIME,
  PERIOD_CURRENT,
  PERIOD_DAY,
  PERIOD_MONTH,
  PERIOD_WEEK,
  PERIOD_YEAR,
} from '@trading/constants';
import { PeriodButtonGroup } from '@trading/pages/Dashboard/components';
import { PeriodFilterProps } from '@trading/pages/Dashboard/components/PeriodFilter/types';
import { usePeriodFilter } from '@trading/pages/Dashboard/components/PeriodFilter/hooks';
import { useTranslation } from '@contexts';

export const BotPeriodFilter = ({
  period,
  onClick,
  excludePeriods,
  ...props
}: PeriodFilterProps & { excludePeriods?: string[] }) => {
  const { t } = useTranslation();

  const { selectedItem, onButtonClick } = usePeriodFilter(period, onClick);

  let items = [
    {
      id: PERIOD_CURRENT,
      text: t('pages.dashboard.periodFilter.current'),
    },
    {
      id: PERIOD_DAY,
      text: t('pages.dashboard.periodFilter.24h'),
    },
    {
      id: PERIOD_WEEK,
      text: t('pages.dashboard.periodFilter.7d'),
    },
    {
      id: PERIOD_MONTH,
      text: t('pages.dashboard.periodFilter.30d'),
    },
    {
      id: PERIOD_YEAR,
      text: t('pages.dashboard.periodFilter.1y'),
    },
    {
      id: PERIOD_ALL_TIME,
      text: t('pages.dashboard.periodFilter.all'),
    },
  ];

  if (excludePeriods && excludePeriods.length) {
    items = items.filter((x) => !excludePeriods.includes(x.id));
  }

  return (
    <PeriodButtonGroup
      items={items}
      onClick={onButtonClick}
      selectedItem={selectedItem}
      {...props}
    />
  );
};