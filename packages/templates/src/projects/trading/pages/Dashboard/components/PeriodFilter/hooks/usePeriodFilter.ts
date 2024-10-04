import { useEffect, useState } from 'react';
import { ButtonGroupItem } from '@ssa-ui-kit/core';
import { PERIOD_CUSTOM } from '@trading/constants';
import { PeriodRange, RequestPeriod, StatisticsPeriod } from '@trading/types';
import { PeriodFilterItem } from '../types';

export const usePeriodFilter = (
  period: RequestPeriod,
  onClick: (period: RequestPeriod) => void,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ButtonGroupItem>({
    id: period.period,
    text: '',
  });
  const [lastSelectedPeriod, setLastSelectedPeriod] =
    useState<StatisticsPeriod>(period.period);
  const [initialRange, setInitialRange] = useState(period.periodRange);

  useEffect(() => {
    setSelectedItem({ id: period.period, text: '' });
  }, [period]);

  const onButtonClick = (item: ButtonGroupItem) => {
    if (item.id === PERIOD_CUSTOM) {
      setIsOpen(true);
    } else {
      setInitialRange(undefined);
      setLastSelectedPeriod(item.id as PeriodFilterItem['id']);
      onClick({
        period: item.id as PeriodFilterItem['id'],
      });
    }
  };

  const onApplyClick = (periodRange: PeriodRange) => {
    setLastSelectedPeriod(PERIOD_CUSTOM);
    setIsOpen(false);
    setInitialRange(periodRange);
    const period = {
      period: PERIOD_CUSTOM as PeriodFilterItem['id'],
      periodRange: periodRange,
    };
    onClick(period);
  };

  const onCancelClick = () => {
    setIsOpen(false);
    setSelectedItem({
      id: lastSelectedPeriod,
      text: '',
    });
  };

  return {
    selectedItem,
    initialRange,
    isOpen,
    onButtonClick,
    onApplyClick,
    onCancelClick,
  };
};
