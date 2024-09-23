import { GraphStatistics, Statistics } from '@trading/types';
import api from '../interceptors';
import {
  StatisticsGetParams,
  StatisticsInstrumentsAPIResponse,
} from '../types';

const BASE_PATH = '/statistics/dashboard';

export const get = async (params?: StatisticsGetParams) => {
  const response = await api.get<{ result: Statistics }>(BASE_PATH, {
    params,
  });

  return response.data;
};

export const getGraphStatistic = async (params: StatisticsGetParams) => {
  const response = await api.get<{ result: GraphStatistics }>(
    `${BASE_PATH}/graphs`,
    {
      params,
    },
  );

  return response.data;
};

export const getStatisticsInstruments = async () => {
  const response = await api.get<StatisticsInstrumentsAPIResponse>(
    '/statistics/instruments',
  );

  return response.data;
};
