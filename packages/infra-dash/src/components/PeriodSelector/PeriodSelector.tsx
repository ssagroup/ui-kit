import { Typeahead, TypeaheadOption } from '@ssa-ui-kit/core';

import { useInfraDashPanelDataPeriodContext } from '@shared/context';
import { PANEL_DATA_PERIOD, PanelDataPeriod } from '@shared/panel';

export const PeriodSelector = () => {
  const { period, changePeriod } = useInfraDashPanelDataPeriodContext();

  const handlePeriodSelect = (period: PanelDataPeriod) => {
    changePeriod(period);
  };

  const options = [
    [PANEL_DATA_PERIOD.LAST_HOUR, 'Last Hour'],
    [PANEL_DATA_PERIOD.LAST_6_HOURS, 'Last 6 Hours'],
    [PANEL_DATA_PERIOD.LAST_24_HOURS, 'Last 24 Hours'],
    [PANEL_DATA_PERIOD.LAST_7_DAYS, 'Last 7 Days'],
    [PANEL_DATA_PERIOD.LAST_30_DAYS, 'Last 30 Days'],
  ];

  return (
    <Typeahead
      filterOptions={false}
      selectedItems={[period]}
      onChange={(componentId) =>
        handlePeriodSelect(componentId as PanelDataPeriod)
      }>
      {options.map(([value, label]) => (
        <TypeaheadOption key={value} value={value} label={label}>
          {label}
        </TypeaheadOption>
      ))}
    </Typeahead>
  );
};
