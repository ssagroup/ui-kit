import { propOr } from '@ssa-ui-kit/utils';
import { useBotInfoResponse } from '@trading/hooks';
import { Bot } from '@trading/types';

export const useBotInfo = () => {
  const result = useBotInfoResponse((data) => data.result);
  const { data } = result;
  const instrument = propOr<Bot, string>('', 'instrument')(data || ({} as Bot));
  const [baseCurrency = '', quoteCurrency = ''] = instrument.split('/');
  return {
    ...result,
    data: {
      ...result.data,
      baseCurrency,
      quoteCurrency,
    } as Bot,
  };
};
