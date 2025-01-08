import { useTranslation } from '@ssa-ui-kit/core';
import { DashboardGraphs } from '@/peopleops/types';
import { useDashboardGraphsData } from '@peopleops/hooks/dashboard';
import { WidgetBarLineChart, WithWidgetLoader } from '..';

export const Utilization = ({
  data = [],
  timestamps = [],
}: {
  data: DashboardGraphs['utilizationGraph'];
  timestamps: DashboardGraphs['timeStamps'];
}) => {
  const { t } = useTranslation();
  return (
    <WidgetBarLineChart
      title={t('widgets.utilization.title')}
      data={data}
      timestamps={timestamps}
      gridArea="utilization"
    />
  );
};

export const UtilizationWithLoader = ({
  isFetching,
}: {
  isFetching: boolean;
}) => {
  const { utilizationGraph = [], timeStamps = [] } = useDashboardGraphsData();
  return (
    <WithWidgetLoader
      title={'widgets.utilization.title'}
      css={{ gridArea: 'utilization' }}
      isFetching={isFetching}>
      <Utilization data={utilizationGraph} timestamps={timeStamps} />
    </WithWidgetLoader>
  );
};
