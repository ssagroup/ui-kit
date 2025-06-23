import { createSafeContext, useUncontrolled } from '@ssa-ui-kit/hooks';

import { PANEL_DATA_PERIOD, PanelDataPeriod } from '@shared/panel';

export interface UseInfraDashPanelDataPeriodOptions {
  defaultPeriod?: PanelDataPeriod;
  period?: PanelDataPeriod;
  onPeriodChange?: (period: PanelDataPeriod) => void;
}

export const useInfraDashPanelDataPeriod = ({
  defaultPeriod,
  period: providedPeriod,
  onPeriodChange,
}: UseInfraDashPanelDataPeriodOptions = {}) => {
  const [period, changePeriod] = useUncontrolled({
    value: providedPeriod,
    defaultValue: defaultPeriod,
    finalValue: PANEL_DATA_PERIOD.LAST_HOUR,
    onChange: onPeriodChange,
  });

  return {
    period,
    changePeriod,
  };
};

export type InfraDashPanelDataPeriodStore = ReturnType<
  typeof useInfraDashPanelDataPeriod
>;

export const [
  InfraDashPanelDataPeriodProvider,
  useInfraDashPanelDataPeriodContext,
] = createSafeContext<InfraDashPanelDataPeriodStore>(
  'useInfraDashPanelDataPeriodContext must be used within a InfraDashPanelDataPeriodProvider',
);
