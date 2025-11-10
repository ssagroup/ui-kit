import { useDashboardCharts } from '@hr/hooks/dashboard';

import { pathOr } from '@ssa-ui-kit/utils';

import { DashboardCharts } from '@/hr/types';

import { WidgetPieChart, WithWidgetLoader } from '..';

export const EducationLevel = ({
  data = [],
}: {
  data: DashboardCharts['educationLevelChart'];
}) => {
  const chartColors = data.map(({ color }) => color);
  return (
    <WidgetPieChart
      cardTitle="widgets.educationLevel.title"
      colorSchemeId="nivo"
      data={data}
      gridArea="educationLevel"
      chartColors={chartColors}
      features={['header', 'fullscreenMode', 'activeItemAnimation']}
    />
  );
};

export const EducationLevelWithLoader = ({
  isFetching,
}: {
  isFetching: boolean;
}) => {
  const charts = useDashboardCharts();
  const data = pathOr<typeof charts, DashboardCharts['educationLevelChart']>(
    [],
    ['result', 'educationLevelChart'],
  )(charts);
  return (
    <WithWidgetLoader
      title={'widgets.educationLevel.title'}
      css={{ gridArea: 'educationLevel' }}
      isFetching={isFetching}>
      <EducationLevel data={data} />
    </WithWidgetLoader>
  );
};
