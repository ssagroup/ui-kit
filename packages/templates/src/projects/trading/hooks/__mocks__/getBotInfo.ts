import { RequestPeriod } from '@/trading/types';

export const getBotInfoResponse = ({
  botId,
  currentRun,
  period,
}: {
  botId: string;
  currentRun: boolean;
  period: Pick<RequestPeriod, 'period'>;
}) => {
  // return mock, dependable on input params
  return {
    botId,
    currentRun,
    period,
  };
};
