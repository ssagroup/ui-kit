import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHeader } from '@trading/contexts';
import {
  PERIOD_DAY,
  PERIOD_WEEK,
  PERIOD_MONTH,
  PERIOD_YEAR,
  PERIOD_CUSTOM,
} from '@trading/constants';
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
    {
      id: PERIOD_CUSTOM,
      text: t('pages.dashboard.periodFilter.custom'),
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
