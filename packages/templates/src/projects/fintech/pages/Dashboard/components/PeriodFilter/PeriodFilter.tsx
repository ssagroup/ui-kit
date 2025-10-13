import {
  PERIOD_DAY,
  PERIOD_MONTH,
  PERIOD_WEEK,
  PERIOD_YEAR,
} from '@fintech/constants';
import { useHeader } from '@fintech/contexts';

import { useTranslation } from '@contexts';

import { usePeriodFilter } from './hooks';
import { ButtonGroupMD, ButtonGroupSM } from './PeriodButtonGroup';
import { PeriodFilterItem, PeriodFilterProps } from './types';

// TODO: remove extra components due to design from the task
export const PeriodFilter = ({
  period,
  onClick,
  ...props
}: PeriodFilterProps) => {
  const { renderHeaderContent } = useHeader();
  const { t } = useTranslation();

  const { selectedItem, onButtonClick } = usePeriodFilter(period, onClick);

  const items: PeriodFilterItem[] = [
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
  ];

  return (
    <>
      <ButtonGroupMD
        items={items}
        onClick={onButtonClick}
        selectedItem={selectedItem}
      />
      {renderHeaderContent(
        <ButtonGroupSM
          items={items}
          onClick={onButtonClick}
          selectedItem={selectedItem}
          {...props}
        />,
      )}
    </>
  );
};
