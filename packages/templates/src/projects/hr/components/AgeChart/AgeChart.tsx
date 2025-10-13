import { useDashboardCharts } from '@hr/hooks/dashboard';

import { pathOr } from '@ssa-ui-kit/utils';

import { DashboardCharts } from '@/hr/types';

import { WidgetPieChart, WithWidgetLoader } from '..';

export const AgeChart = ({
  data = [],
}: {
  data: DashboardCharts['ageChart'];
}) => {
  const chartColors = data.map(({ color }) => color);

  return (
    <WidgetPieChart
      cardTitle="widgets.ageChart.title"
      colorSchemeId="paired"
      data={data}
      gridArea="age"
      chartColors={chartColors}
      features={['header', 'fullscreenMode', 'activeItemAnimation']}
    />
  );
};

export const AgeChartWithLoader = ({ isFetching }: { isFetching: boolean }) => {
  const charts = useDashboardCharts();
  const data = pathOr<typeof charts, DashboardCharts['ageChart']>({}, [
    'result',
    'ageChart',
  ])(charts);
  return (
    <WithWidgetLoader
      title={'widgets.ageChart.title'}
      css={{ gridArea: 'age' }}
      isFetching={isFetching}>
      <AgeChart data={data} />
    </WithWidgetLoader>
  );
};
