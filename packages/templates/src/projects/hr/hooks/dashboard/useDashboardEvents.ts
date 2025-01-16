import * as API from '@/hr/types';
import { getFilledTemplate } from '@/hr/utils/eventsGenerator';

export const useDashboardEvents =
  (): API.CommonAPIResponse<API.DashboardEvents> => {
    const response = getFilledTemplate();
    return {
      result: response,
      targetUrl: null,
      success: true,
      unAuthorizedRequest: false,
    };
  };
