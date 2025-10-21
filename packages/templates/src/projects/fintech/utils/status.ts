import { Enum } from '@fintech/types';

import { propOr } from '@ssa-ui-kit/utils';

export const getColorsByStatus = (data?: Enum[]) => {
  const result: Record<string, Enum> = {};
  data?.forEach((colorEnum) => {
    result[colorEnum.key] = colorEnum;
  });
  return result;
};

export const getStatusInfo = (
  status: null | string = '',
  colorsByStatus: Record<string, Enum>,
) => {
  const statusInfo = propOr({}, status || '')(colorsByStatus);
  const tradeColors = propOr<Record<string, Enum>, Enum['styles']>(
    {},
    'styles',
  )(statusInfo);
  const localizedName = propOr<Record<string, Enum>, Enum['localizedName']>(
    '',
    'localizedName',
  )(statusInfo);
  return {
    tradeColors,
    localizedName,
  };
};
