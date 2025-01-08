import * as API from '@/peopleops/types';
import { getFilledTemplate } from '@/peopleops/utils/eventsGenerator';

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
