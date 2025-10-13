import { useTheme } from '@emotion/react';

import { Icon } from '@ssa-ui-kit/core';

import { StyledButton } from './StyledButton';
import { ReadAllButtonProps } from './types';

export const ReadAllButton = (props: ReadAllButtonProps) => {
  const theme = useTheme();
  return (
    <StyledButton
      variant="tertiary"
      startIcon={
        <Icon name="check-circle" size={20} color={theme.colors.blueDark} />
      }
      {...props}
    />
  );
};
