import { propOr } from '@ssa-ui-kit/utils';
import { useEnumsResponse } from '@trading/hooks';
import { EnumsApiListResponse } from '@/trading/types';

export const useBotsPageEnums = () => {
  const data = useEnumsResponse();
  const result = propOr<typeof data, EnumsApiListResponse['result']>(
    {},
    'result',
  )(data);
  return {
    strategy: result.botStrategies,
    status: result.colorsForBotStatuses,
    platform: result.exchangePlatforms,
  };
};

export const useBotStrategiesLocalizedName = () => {
  const enums = useBotsPageEnums();
  const result: Record<string, string> = {};
  enums.strategy.map((strategy) => {
    result[strategy.key] = strategy.localizedName;
  });
  return result;
};
