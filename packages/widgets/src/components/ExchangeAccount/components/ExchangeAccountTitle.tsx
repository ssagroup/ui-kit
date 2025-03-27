import { Typography } from '@ssa-ui-kit/core';
import { useTheme } from '@emotion/react';

import { useExchangeAccountContext } from './ExchangeAccountProvider';

export interface ExchangeAccountTitleProps
  extends Omit<React.ComponentProps<typeof Typography>, 'children'> {
  children?: React.ReactNode;
}

export const ExchangeAccountTitle = ({
  children,
  ...props
}: ExchangeAccountTitleProps) => {
  const theme = useTheme();
  const { title } = useExchangeAccountContext();
  return (
    <Typography
      color={theme.colors.greyDropdownFocused}
      variant="subtitle"
      weight="regular"
      {...props}>
      {children ?? title}
    </Typography>
  );
};
