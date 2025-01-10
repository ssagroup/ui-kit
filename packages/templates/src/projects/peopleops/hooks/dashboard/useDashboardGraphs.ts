import { DateTime } from 'luxon';
import * as API from '@/peopleops/types';
import { dashboardGraphsMock } from './__mocks__/dashboardGraphs';

export const useDashboardGraphs =
  (): API.CommonAPIResponse<API.DashboardGraphs> => {
    let firstDate = DateTime.now();
    firstDate = firstDate.set({ day: 15, hour: 12 });
    const dynamicTimestamps: number[] = [firstDate.toMillis()];
    for (let i = 1; i < 12; i++) {
      const newDate = firstDate.plus({ month: i });
      dynamicTimestamps.push(newDate.toMillis());
    }
    const queryResult = {
      result: {
        timeStamps: dynamicTimestamps,
        ...dashboardGraphsMock,
      } as API.DashboardGraphs,
      targetUrl: null,
      success: true,
      unAuthorizedRequest: false,
    };

    return queryResult;
  };

export const useDashboardGraphsData = () => {
  const { result } = useDashboardGraphs();
  return result;
};
