import { css, useTheme } from '@emotion/react';
import { Card, CardContent, Typography } from '@ssa-ui-kit/core';

export interface StatisticCardProps {
  value: string | number;
  unit?: string;
  title: string;
  // onClick?: () => void;
  isActive?: boolean;
}

const StatisticCard = ({
  value,
  unit,
  title,
  isActive,
}: StatisticCardProps) => {
  const theme = useTheme();
  const number = Number(value);
  const isNumber = isNaN(number) ? value : Math.floor(number);

  console.log(isActive);
  return (
    <Card
      noShadow
      css={css`
        align-items: flex-start;
        background: ${theme.colors.greyLighter};
        padding: 4px 10px;
        border-radius: 6px;
        cursor: pointer;
        box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow};
        width: fit-content;
        min-width: 123px;
        ${isActive &&
        `background: ${theme.colors.white}; box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow24}`}
      `}>
      <CardContent css={{ alignItems: 'baseline', gap: '2px' }}>
        <Typography variant="h5" weight="bold" color={theme.colors.greyDarker}>
          {isNumber}
        </Typography>
        {unit ? (
          <Typography variant="h6" weight="lighter">
            {unit}
          </Typography>
        ) : null}
      </CardContent>
      <CardContent>
        <Typography css={{ fontSize: '12px' }}>{title}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatisticCard;
