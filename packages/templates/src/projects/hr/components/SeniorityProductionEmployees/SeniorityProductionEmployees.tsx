import { useTranslation } from '@ssa-ui-kit/core';
import { DashboardGraphs } from '@/hr/types';
import { useDashboardGraphsData } from '@hr/hooks/dashboard';
import { WidgetBarLineChart, WithWidgetLoader } from '..';

export const SeniorityProductionEmployees = ({
  data = [],
  timestamps = [],
}: {
  data: DashboardGraphs['seniorityProductionEmployeesGraph'];
  timestamps: DashboardGraphs['timeStamps'];
}) => {
  const { t } = useTranslation();
  return (
    <WidgetBarLineChart
      title={t('widgets.seniorityOfProductionEmployees.title')}
      data={data}
      timestamps={timestamps}
      gridArea="seniorityOfProductionEmployees"
    />
  );
};

export const SeniorityProductionEmployeesWithLoader = ({
  isFetching,
}: {
  isFetching: boolean;
}) => {
  const { seniorityProductionEmployeesGraph = [], timeStamps = [] } =
    useDashboardGraphsData();
  return (
    <WithWidgetLoader
      title={'widgets.seniorityOfProductionEmployees.title'}
      css={{ gridArea: 'seniorityOfProductionEmployees' }}
      isFetching={isFetching}>
      <SeniorityProductionEmployees
        data={seniorityProductionEmployeesGraph}
        timestamps={timeStamps}
      />
    </WithWidgetLoader>
  );
};
