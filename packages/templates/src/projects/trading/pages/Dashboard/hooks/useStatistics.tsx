import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { MINUTE_IN_MS } from '@trading/constants';
import * as API from '@trading/api';
import { useCurrency } from '@trading/contexts';
import { GraphStatistics, Statistics, RequestPeriod } from '@trading/types';
import { useScoreboardItems } from './useScoreboardItems';
import { defaultGraphStatistics } from './defaultStatistics';
import { DEFAULT_STATISTICS_DATA } from './constants';

type UseStatisticsProps = {
  period: RequestPeriod;
};

export const useGraphStatistic = (params: UseStatisticsProps) => {
  /**
   * This is to keep the current data showing while loading the requested
   * data.
   * "keepPreviousData" works differently: it shows the previously loaded
   * (and cached) data for the current query key. Thus, when we change the
   * period selected, we don't get the current data showing but the cached data
   * for the new query key.
   * */
  const { currency } = useCurrency();
  const [prevData, setPrevData] = useState<GraphStatistics['data']>(
    defaultGraphStatistics.result['data'],
  );
  const { data, isFetching, ...rest } = useQuery({
    queryKey: ['graphStatistic', currency, params],
    queryFn: () => API.Statistics.getGraphStatistic(params?.period),
    gcTime: 0,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchInterval: MINUTE_IN_MS,
    retry: false,
  });

  useEffect(() => {
    if (!isFetching && data != null) {
      setPrevData(data?.result?.data);
    }
  }, [data, isFetching]);

  return {
    ...rest,
    isFetching,
    data: isFetching
      ? prevData
      : data?.result?.data || ([] as GraphStatistics['data']),
  };
};

export const useWeightedPriceData = (params: UseStatisticsProps) => {
  /**
   * This is to keep the current data showing while loading the requested
   * data.
   * "keepPreviousData" works differently: it shows the previously loaded
   * (and cached) data for the current query key. Thus, when we change the
   * period selected, we don't get the current data showing but the cached data
   * for the new query key.
   * */
  const { currency } = useCurrency();
  const [prevData, setPrevData] = useState<
    GraphStatistics['weightedPriceData']
  >(defaultGraphStatistics.result['weightedPriceData']);
  const { data, isFetching, ...rest } = useQuery({
    queryKey: ['graphStatistic', currency, params],
    queryFn: () => API.Statistics.getGraphStatistic(params?.period),
    gcTime: 0,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchInterval: MINUTE_IN_MS,
    retry: false,
  });

  useEffect(() => {
    if (!isFetching && data != null) {
      setPrevData(data?.result?.weightedPriceData);
    }
  }, [data, isFetching]);

  return {
    ...rest,
    isFetching,
    weightedPriceData: isFetching
      ? prevData
      : data?.result.weightedPriceData ||
        ({} as GraphStatistics['weightedPriceData']),
  };
};

export const useStatistics = (params: UseStatisticsProps) => {
  const { currency } = useCurrency();
  const { data, ...rest } = useQuery({
    queryKey: ['statistics', currency, params],
    queryFn: () => API.Statistics.get(params?.period),
    // This is to disable cache
    gcTime: 0,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchInterval: MINUTE_IN_MS,
    retry: false,
  });
  const items = useScoreboardItems(data?.result);

  return {
    ...rest,
    data: data?.result || (DEFAULT_STATISTICS_DATA as Statistics),
    isFetching: rest.isFetching,
    items,
  };
};
