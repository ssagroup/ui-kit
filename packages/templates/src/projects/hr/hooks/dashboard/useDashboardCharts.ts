import * as API from '@/hr/types';

import { dashboardChartsMock } from './__mocks__/dashboardCharts';

export const useDashboardCharts =
  (): API.CommonAPIResponse<API.DashboardCharts> => ({
    result: dashboardChartsMock,
    targetUrl: null,
    success: true,
    unAuthorizedRequest: false,
  });
