import { css, useTheme } from '@emotion/react';
import { Card, CardContent, CardHeader, Typography } from '@ssa-ui-kit/core';
import { BalancePieChart } from './BalancePieChart';
import { WithLink } from './WithLink';
import { AccountBalanceProps } from './types';

export const AccountBalance = ({
  title = 'Balance',
  className,
  onClick,
  link,
  variant = 'valueList',
  ...props
}: AccountBalanceProps) => {
  const theme = useTheme();

  return (
    <WithLink link={link} onClick={onClick}>
      <Card
        className={className}
        onClick={link ? undefined : onClick}
        css={css`
          border-radius: 20px;
          padding: 5px 10px;
          width: 100%;

          ${theme.mediaQueries.md} {
            padding: 10px;
          }

          ${theme.mediaQueries.lg} {
            padding: 12px 20px 11px;
          }

          box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow};
        `}>
        <CardHeader
          css={css`
            margin-bottom: 10px;
          `}>
          <Typography
            variant="h3"
            weight="bold"
            css={css`
              font-size: 16px;
              ${theme.mediaQueries.md} {
                font-size: 20px;
              }
            `}>
            {title}
          </Typography>
        </CardHeader>
        <CardContent
          css={css`
            max-width: 406px;
            width: 100%;
            display: block;
          `}>
          <BalancePieChart theme={theme} variant={variant} {...props} />
        </CardContent>
      </Card>
    </WithLink>
  );
};
