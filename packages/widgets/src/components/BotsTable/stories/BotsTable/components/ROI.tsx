import { useTheme } from '@emotion/react';
import { Icon, Wrapper } from '@ssa-ui-kit/core';
import * as Types from '@components/BotsTable/types';

export const ROI = ({ amount, isIncreasing }: Types.ROI) => {
  const theme = useTheme();
  return (
    <Wrapper>
      <div
        css={{
          width: 35,
          textAlign: 'right',
          marginRight: 5,
        }}>
        {isIncreasing ? '+' : '-'}
        {amount}%
      </div>
      <Icon
        name={`${isIncreasing ? 'arrow-up' : 'arrow-down'}`}
        size={13}
        color={isIncreasing ? theme.colors.green : theme.colors.pink}
      />
    </Wrapper>
  );
};
