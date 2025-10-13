import { useTheme } from '@emotion/react';
import { GrowthIndexIcon } from '@fintech/components';

import { Wrapper } from '@ssa-ui-kit/core';

import * as Types from '../pages/BotsPage/types';

export const PNLCell = ({
  amount,
  currency,
  isIncreasing = null,
}: Types.PNL) => {
  const outputAmount = Math.abs(amount);
  const outputSign = amount > 0 ? '+' : amount === 0 ? '' : '-';
  const theme = useTheme();
  const color =
    amount > 0
      ? theme.colors.green
      : amount < 0
        ? theme.colors.red
        : theme.colors.greyDarker;

  return (
    <Wrapper>
      <Wrapper
        css={{
          textAlign: 'right',
          marginRight: 5,
          width: 'auto',
          whiteSpace: 'nowrap',
        }}>
        <div
          css={{
            width: 10,
            color,
          }}>
          {outputSign}
        </div>
        <span css={{ color }}>{outputAmount}</span>
        &nbsp;
        <span css={{ color }}>{currency}</span>
      </Wrapper>
      <GrowthIndexIcon isIncreasing={isIncreasing} size={13} />
    </Wrapper>
  );
};
