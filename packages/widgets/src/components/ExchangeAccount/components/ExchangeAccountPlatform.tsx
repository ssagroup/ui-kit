import { useTheme } from '@emotion/react';

import { Typography } from '@ssa-ui-kit/core';

import * as S from '../styles';

import { useExchangeAccountContext } from './ExchangeAccountProvider';

export interface ExchangeAccountPlatformProps
  extends Omit<React.ComponentProps<typeof Typography>, 'children'> {
  children?: React.ReactNode;
}

export const ExchangeAccountPlatform = ({
  children,
  ...props
}: ExchangeAccountPlatformProps) => {
  const theme = useTheme();
  const { platform } = useExchangeAccountContext();
  return (
    <Typography
      variant="subtitle"
      weight="bold"
      color={theme.colors.greyDarker}
      css={S.Platform}
      {...props}>
      {children ?? platform}
    </Typography>
  );
};
