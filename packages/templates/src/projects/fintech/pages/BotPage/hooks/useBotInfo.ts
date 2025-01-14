import { propOr } from '@ssa-ui-kit/utils';
import { useBotInfoResponse } from '@fintech/hooks';
import { Bot } from '@fintech/types';

export const useBotInfo = () => {
  const data = useBotInfoResponse();
  const instrument = propOr<Bot, string>('', 'instrument')(data || ({} as Bot));
  const [baseCurrency = '', quoteCurrency = ''] = instrument.split('/');
  return {
    data: {
      ...data,
      baseCurrency,
      quoteCurrency,
    } as Bot,
  };
};
