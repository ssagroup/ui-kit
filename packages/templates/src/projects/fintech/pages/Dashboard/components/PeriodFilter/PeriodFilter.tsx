import React from 'react';
import { useTranslation } from '@contexts';
import { useHeader } from '@fintech/contexts';
import {
  PERIOD_DAY,
  PERIOD_WEEK,
  PERIOD_MONTH,
  PERIOD_YEAR,
} from '@fintech/constants';
import { ButtonGroupSM, ButtonGroupMD } from './PeriodButtonGroup';
import { PeriodFilterProps, PeriodFilterItem } from './types';
import { usePeriodFilter } from './hooks';

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
