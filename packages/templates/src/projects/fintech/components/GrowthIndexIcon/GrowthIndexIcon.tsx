import { useTheme } from '@emotion/react';
import { Icon } from '@ssa-ui-kit/core';
import { isNill } from '@ssa-ui-kit/utils';
import { GrowthIndexIconProps } from './types';

export const GrowthIndexIcon = ({
  isIncreasing,
  size,
}: GrowthIndexIconProps) => {
  const theme = useTheme();
  return (
    !isNill(isIncreasing) && (
      <Icon
        size={size}
        name={`arrow-${isIncreasing ? 'up' : 'down'}`}
        color={theme.colors[isIncreasing ? 'green' : 'pink']}
      />
    )
  );
};
