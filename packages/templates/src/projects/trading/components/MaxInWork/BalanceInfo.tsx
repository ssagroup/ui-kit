import React from 'react';
import { useTheme } from '@emotion/react';
import { Typography } from '@ssa-ui-kit/core';
import { MaxInWorkProps } from './types';
import { WidgetCardTitle } from '../WidgetCard';

type BalanceInfoProps = { text: string } & Pick<MaxInWorkProps, 'percent'>;

export const BalanceInfo = ({ percent, text }: BalanceInfoProps) => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <WidgetCardTitle variant="h3" weight="bold">
        {percent}%
      </WidgetCardTitle>
      <Typography
        color={theme.colors.greyDarker60}
        css={{
          fontSize: '12px',
          lineHeight: 1,
          [theme.mediaQueries.md]: {
            fontSize: '10px',
          },
          [theme.mediaQueries.lg]: {
            fontSize: '14px',
          },
        }}>
        {text}
      </Typography>
    </React.Fragment>
  );
};
