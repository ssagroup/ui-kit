import { useTheme } from '@emotion/react';
import { Icon } from '@ssa-ui-kit/core';
import { GrowthIndexIconProps } from './types';

export const GrowthIndexIcon = ({
  isIncreasing,
  size,
}: GrowthIndexIconProps) => {
  const theme = useTheme();
  return (
    isIncreasing != null && (
      <Icon
        size={size}
        name={`arrow-${isIncreasing ? 'up' : 'down'}`}
        color={theme.colors[isIncreasing ? 'green' : 'pink']}
      />
    )
  );
};
