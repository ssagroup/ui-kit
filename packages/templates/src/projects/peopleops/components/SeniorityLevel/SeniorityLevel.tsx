import { pathOr } from '@ssa-ui-kit/utils';
import { DashboardCharts } from '@/peopleops/types';
import { useDashboardCharts } from '@peopleops/hooks/dashboard';
import { WidgetPieChart, WithWidgetLoader } from '..';

export const SeniorityLevel = ({
  data = [],
}: {
  data: DashboardCharts['seniorityInfoChart'];
}) => {
  const chartColors = data.map(({ color }) => color);
  return (
    <WidgetPieChart
      cardTitle="widgets.seniorityLevel.title"
      colorSchemeId="set1"
      data={data}
      gridArea="seniorityLevel"
      chartColors={chartColors}
      features={['header', 'fullscreenMode', 'activeItemAnimation']}
    />
  );
};

export const SeniorityLevelWithLoader = ({
  isFetching,
}: {
  isFetching: boolean;
}) => {
  const charts = useDashboardCharts();
  const data = pathOr<typeof charts, DashboardCharts['seniorityInfoChart']>(
    {},
    ['data', 'result', 'seniorityInfoChart'],
  )(charts);
  return (
    <WithWidgetLoader
      title={'widgets.seniorityLevel.title'}
      css={{ gridArea: 'seniorityLevel' }}
      isFetching={isFetching}>
      <SeniorityLevel data={data} />
    </WithWidgetLoader>
  );
};
