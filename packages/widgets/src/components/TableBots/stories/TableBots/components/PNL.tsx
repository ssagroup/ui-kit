import { Icon, Wrapper } from '@ssa-ui-kit/core';
import { useTheme } from '@emotion/react';
import * as Types from '@components/TableBots/types';

export const PNL = ({ amount, currency, isIncreasing }: Types.PNL) => {
  const theme = useTheme();
  return (
    <Wrapper>
      <div
        css={{
          width: 75,
          textAlign: 'right',
          marginRight: 5,
        }}>
        {isIncreasing ? '+' : '-'}
        {amount}
        &nbsp;
        {currency}
      </div>
      <Icon
        name={`${isIncreasing ? 'arrow-up' : 'arrow-down'}`}
        size={13}
        color={isIncreasing ? theme.colors.green : theme.colors.pink}
      />
    </Wrapper>
  );
};
