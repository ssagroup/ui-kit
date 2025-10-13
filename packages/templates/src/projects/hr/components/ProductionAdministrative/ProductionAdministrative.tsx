import { useDashboardGraphsData } from '@hr/hooks/dashboard';

import { useTranslation } from '@ssa-ui-kit/core';

import { DashboardGraphs } from '@/hr/types';

import { WidgetBarLineChart, WithWidgetLoader } from '..';

export const ProductionAdministrative = ({
  data = [],
  timestamps = [],
}: {
  data: DashboardGraphs['seniorityProductionEmployeesGraph'];
  timestamps: DashboardGraphs['timeStamps'];
}) => {
  const { t } = useTranslation();
  return (
    <WidgetBarLineChart
      title={t('widgets.productionAdministrative.title')}
      data={data}
      timestamps={timestamps}
      gridArea="productionAdministrative"
    />
  );
};

export const ProductionAdministrativeWithLoader = ({
  isFetching,
}: {
  isFetching: boolean;
}) => {
  const { productionAdministrativeGraph = [], timeStamps = [] } =
    useDashboardGraphsData();
  return (
    <WithWidgetLoader
      title={'widgets.productionAdministrative.title'}
      css={{ gridArea: 'productionAdministrative' }}
      isFetching={isFetching}>
      <ProductionAdministrative
        data={productionAdministrativeGraph}
        timestamps={timeStamps}
      />
    </WithWidgetLoader>
  );
};
