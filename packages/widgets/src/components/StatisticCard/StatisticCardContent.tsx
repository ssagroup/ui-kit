import { CardContent, Typography } from '@ssa-ui-kit/core';
import { StatisticCardProps } from './StatisticCard';
import { useTheme } from '@emotion/react';

const StatisticCardContent = ({ value, unit }: StatisticCardProps) => {
  const theme = useTheme();
  return (
    <CardContent
      css={{
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        gap: '2px',
      }}>
      <Typography variant="h5" weight="bold" color={theme.colors.greyDarker}>
        {value}
      </Typography>
      {unit ? (
        <Typography data-testid="unit" variant="h6" weight="lighter">
          {unit}
        </Typography>
      ) : null}
    </CardContent>
  );
};

export default StatisticCardContent;
