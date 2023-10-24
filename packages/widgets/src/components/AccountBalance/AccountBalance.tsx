import { css, useTheme } from '@emotion/react';
import { Card, CardContent, CardHeader, Typography } from '@ssa-ui-kit/core';
import { BalancePieChart } from './BalancePieChart';
import { AccountBalanceProps } from './types';

// TODO: Do I need <Wrapper />?
export const AccountBalance = ({
  title = 'Balance',
  ...props
}: AccountBalanceProps) => {
  const theme = useTheme();

  return (
    <Card
      css={css`
        border-radius: 20px;
        padding-inline: 24px;
        padding-block: 24px;
      `}>
      <CardHeader>
        <Typography variant="h3" weight="bold">
          {title}
        </Typography>
      </CardHeader>
      <CardContent
        css={css`
          width: 400px;
          display: block;
        `}>
        <BalancePieChart theme={theme} {...props} />
      </CardContent>
    </Card>
  );
};
