import { useParams } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSwitchContext } from '@ssa-ui-kit/core';
import { usePeriod } from '@trading/contexts';
import * as API from '@trading/api';

export const useBotInfoResponse = <T = API.SingleBotResponse>(
  select?: (data: API.SingleBotResponse) => T,
) => {
  const { id: botId } = useParams();
  const { isOn: currentRun } = useSwitchContext();
  const { period } = usePeriod();
  /**
   * botId
   * currentRun
   * period:
   *** period: StatisticPeriod
   ***** "Day" | "Current" | "Week" | "Month" | "Year" | "AllTime" | "Custom"
   *** periodRange
   ***** start: Date
   ***** end: Date
   ******* periodRange - we don't need it! We don't need Custom!
   */
  return useQuery({
    queryKey: ['bot-info', { botId, currentRun, period }],
    gcTime: 0,
    placeholderData: keepPreviousData,
    queryFn: API.Bots.getBotInfo.bind(null, botId, {
      currentRun,
      ...period,
    }),
    select,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: typeof botId === 'string',
  });
};
