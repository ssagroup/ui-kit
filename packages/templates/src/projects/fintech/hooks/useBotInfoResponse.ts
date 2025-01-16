import { usePeriod } from '@fintech/contexts';
import { getBotInfoResponseMock } from './__mocks__/getBotInfo';

export const useBotInfoResponse = () => {
  const { period } = usePeriod();
  const data = getBotInfoResponseMock({ period });
  return data;
};
