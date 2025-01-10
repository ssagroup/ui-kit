import { useState } from 'react';
import { css } from '@emotion/css';
import { css as cssReact } from '@emotion/react';
import { pathOr } from '@ssa-ui-kit/utils';
import { useMinMDMediaQuery } from '@ssa-ui-kit/hooks';
import { DashboardCharts } from '@/peopleops/types';
import * as hooks from '@peopleops/hooks';
import { WidgetPieChart, WithWidgetLoader } from '..';

export const Departments = ({
  data = [],
}: {
  data: DashboardCharts['headCountByDepartmentChart'];
}) => {
  const [isFullscreenMode, setFullscreenMode] = useState(false);
  const isMinMDMediaQuery = useMinMDMediaQuery();
  const chartColors = data.map(({ color }) => color);

  return (
    <WidgetPieChart
      cardTitle="widgets.departments.title"
      colorSchemeId="paired"
      data={data}
      gridArea="departments"
      pieChartWidth={isMinMDMediaQuery ? '100%' : '160px'}
      pieChartHeight={isMinMDMediaQuery ? '100%' : '160px'}
      chartColors={chartColors}
      features={['header', 'fullscreenMode', 'activeItemAnimation']}
      handleFullscreenModeChange={setFullscreenMode}
      labelListStyles={cssReact`
        flex: ${isFullscreenMode && 'auto'};
        li {
          padding-right: ${isFullscreenMode ? '12px' : 0};
        }
        h6 {
          &:nth-of-type(1) {
            margin-right: ${isFullscreenMode && '5px'};
          }
        }
      `}
      valueListStyles={cssReact`
        margin-left: 0;
        li {
          height: ${isFullscreenMode ? 'auto' : '21.5px !important'};
        }
      `}
      wrapperClassname={css`
        & > div:last-of-type {
          justify-content: center;
          & > div {
            width: 100%;
            flex-direction: column;
            flex: 1;
            height: 100%;
            max-height: ${isFullscreenMode ? 'unset' : '100%'};
            & div.pie-chart-wrapper {
              width: ${isMinMDMediaQuery ? '100%' : '160px'};
              height: ${isMinMDMediaQuery ? '100%' : '160px'};
              max-height: ${isMinMDMediaQuery ? '100%' : '160px'};
            }
            & > div:last-of-type {
              width: 100%;
              max-width: 100%;
              height: ${isMinMDMediaQuery ? 'auto' : '100%'};
            }
          }
        }
      `}
    />
  );
};

export const DepartmentsWithLoader = ({
  isFetching,
}: {
  isFetching: boolean;
}) => {
  const charts = hooks.Dashboard.useDashboardCharts();
  const isMinMDMediaQuery = useMinMDMediaQuery();
  const data = pathOr<
    typeof charts,
    DashboardCharts['headCountByDepartmentChart']
  >({}, ['result', 'headCountByDepartmentChart'])(charts);
  return (
    <WithWidgetLoader
      title={'widgets.departments.title'}
      css={{
        gridArea: 'departments',
        paddingBottom: isMinMDMediaQuery ? 0 : 5,
      }}
      isFetching={isFetching}>
      <Departments data={data} />
    </WithWidgetLoader>
  );
};
