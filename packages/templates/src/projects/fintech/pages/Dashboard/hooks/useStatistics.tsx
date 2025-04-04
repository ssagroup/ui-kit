import { GraphStatistics, Statistics, RequestPeriod } from '@fintech/types';
import { useScoreboardItems } from './useScoreboardItems';
import * as mockStatistics from './__mocks__/statistics';
import * as mockGraphStatistics from './__mocks__/graphStatistics';
import { pathOr } from '@ssa-ui-kit/utils';

type UseStatisticsProps = {
  period: RequestPeriod;
};

export const useGraphStatistic = (params: UseStatisticsProps) => {
  const result = {
    isFetching: false,
    data: pathOr<typeof mockGraphStatistics, GraphStatistics['data']>(
      mockGraphStatistics.Day.data.data,
      [params.period.period, 'data', 'data'],
    )(mockGraphStatistics),
  };
  return result;
};

export const useStatistics = (params: UseStatisticsProps) => {
  const result = {
    isFetching: false,
    data: pathOr<typeof mockStatistics, Statistics>(mockStatistics.Day.data, [
      params.period.period,
      'data',
    ])(mockStatistics),
  };
  const items = useScoreboardItems(result.data);

  return {
    data: result.data,
    isFetching: false,
    items,
  };
};
