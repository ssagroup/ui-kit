import { Balance } from '@fintech/types';

import { propOr } from '@ssa-ui-kit/utils';

type BalanceData = {
  id: string;
  label: string;
  legendValue: number;
  value: number;
};

export const transformCommonBalanceData = (
  value: Balance,
  other?: BalanceData,
) => {
  const coins = propOr<Balance, Balance['coins']>([], 'coins')(value);
  const data = coins.map((item) => {
    return {
      id: item.coinName,
      label: item.coinName,
      legendValue: item.coins,
      value: item.price,
    };
  });
  return {
    total: propOr('', 'total')(value),
    currency: propOr('', 'balanceTo')(value),
    data: other?.value ? [...data, other] : [...data],
  };
};

export const transformBalanceData = (value: Balance) => {
  return transformCommonBalanceData(value, {
    id: 'Other',
    label: 'Other',
    legendValue: value.otherCoinsPrice,
    value: value.otherCoinsPrice,
  });
};
