import * as API from '@/hr/types';

import { dashboardIndicatorsMock } from './__mocks__/dashboardIndicators';

export const useDashboardIndicators =
  (): API.CommonAPIResponse<API.DashboardIndicators> => {
    const result = {
      result: dashboardIndicatorsMock,
      targetUrl: null,
      success: true,
      unAuthorizedRequest: false,
      __abp: true,
    };

    return result;
  };
