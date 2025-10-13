import { useDashboardGraphsData } from '@hr/hooks/dashboard';

import { useTranslation } from '@ssa-ui-kit/core';

import { DashboardGraphs } from '@/hr/types';

import { WidgetBarLineChart, WithWidgetLoader } from '..';

export const FTE = ({
  data = [],
  timestamps = [],
}: {
  data: DashboardGraphs['fteGraph'];
  timestamps: DashboardGraphs['timeStamps'];
}) => {
  const { t } = useTranslation();
  return (
    <WidgetBarLineChart
      title={t('widgets.fte.title')}
      data={data}
      timestamps={timestamps}
      gridArea="fteGraph"
    />
  );
};

export const FTEWithLoader = ({ isFetching }: { isFetching: boolean }) => {
  const { fteGraph = [], timeStamps = [] } = useDashboardGraphsData();
  return (
    <WithWidgetLoader
      title={'widgets.fte.title'}
      css={{ gridArea: 'fteGraph' }}
      isFetching={isFetching}>
      <FTE data={fteGraph} timestamps={timeStamps} />
    </WithWidgetLoader>
  );
};
