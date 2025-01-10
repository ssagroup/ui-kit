import { useTranslation } from '@ssa-ui-kit/core';
import { DashboardGraphs } from '@/peopleops/types';
import { useDashboardGraphsData } from '@peopleops/hooks/dashboard';
import { WidgetBarLineChart, WithWidgetLoader } from '..';

export const ResourcesOnBench = ({
  data = [],
  timestamps = [],
}: {
  data: DashboardGraphs['resourcesOnBenchGraph'];
  timestamps: DashboardGraphs['timeStamps'];
}) => {
  const { t } = useTranslation();
  return (
    <WidgetBarLineChart
      title={t('widgets.resourcesOnBench.title')}
      data={data}
      timestamps={timestamps}
      gridArea="resourcesOnBench"
    />
  );
};

export const ResourcesOnBenchWithLoader = ({
  isFetching,
}: {
  isFetching: boolean;
}) => {
  const { resourcesOnBenchGraph = [], timeStamps = [] } =
    useDashboardGraphsData();
  return (
    <WithWidgetLoader
      title={'widgets.resourcesOnBench.title'}
      css={{ gridArea: 'resourcesOnBench' }}
      isFetching={isFetching}>
      <ResourcesOnBench data={resourcesOnBenchGraph} timestamps={timeStamps} />
    </WithWidgetLoader>
  );
};
