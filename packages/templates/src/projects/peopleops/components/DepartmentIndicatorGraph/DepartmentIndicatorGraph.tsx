import { useTheme } from '@emotion/react';
import { DashboardGraphs } from '@/peopleops/types';
import { useDashboardGraphsData } from '@peopleops/hooks/dashboard';
import * as S from './styles';
import { WidgetBarLineChart, WithWidgetLoader } from '..';
import { generateGridTemplateAreas } from './utils';

export const DepartmentIndicatorGraph = ({
  data = [],
  timestamps = [],
  title = '',
  gridArea = '',
}: {
  data: DashboardGraphs['utilizationGraph'];
  timestamps: DashboardGraphs['timeStamps'];
  title: string;
  gridArea: string;
}) => (
  <WidgetBarLineChart
    title={title}
    data={data}
    timestamps={timestamps}
    gridArea={gridArea}
  />
);

const COLUMNS_COUNT = 2;

export const DepartmentIndicatorWidgets = () => {
  const theme = useTheme();
  const { departmentsIndicatorsGraphs = [], timeStamps = [] } =
    useDashboardGraphsData();

  const rowsCount = Math.ceil(
    departmentsIndicatorsGraphs.length / COLUMNS_COUNT,
  );
  const gridAreas: string[] = [];
  for (let i = 0; i < departmentsIndicatorsGraphs.length; i++) {
    gridAreas.push(`department-indicator-graph-${i}`);
  }
  const gridTemplateAreas = generateGridTemplateAreas(gridAreas);
  const gridTemplateAreasOneColumn = generateGridTemplateAreas(gridAreas, 1);
  return (
    <S.DepartmentIndicatorWidgets
      css={{
        gridTemplateRows: `repeat(${departmentsIndicatorsGraphs.length}, 220px)`,
        gridTemplateAreas: gridTemplateAreasOneColumn,
        [theme.mediaQueries.md]: {
          gridTemplateRows: `repeat(${rowsCount}, 220px)`,
          gridTemplateAreas,
        },
      }}>
      {departmentsIndicatorsGraphs.map((item, index) => (
        <WithWidgetLoader
          key={`department-indicator-graph-${index}`}
          title={item.departmentName}
          css={{ gridArea: `department-indicator-graph-${index}` }}
          isFetching={false}>
          <DepartmentIndicatorGraph
            data={item.departmentGraphData}
            timestamps={timeStamps}
            title={item.departmentName}
            gridArea={`department-indicator-graph-${index}`}
          />
        </WithWidgetLoader>
      ))}
    </S.DepartmentIndicatorWidgets>
  );
};
