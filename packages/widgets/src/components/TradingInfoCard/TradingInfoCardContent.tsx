import { useTheme } from '@emotion/react';

import { CardContent, Typography } from '@ssa-ui-kit/core';

import { TradingInfoContent } from './types';

const TradingInfoCardContent = ({ value, unit, icon }: TradingInfoContent) => {
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
      {icon ? (
        <div css={{ display: 'flex', alignSelf: 'center', marginLeft: '3px' }}>
          {icon}
        </div>
      ) : null}
    </CardContent>
  );
};

export default TradingInfoCardContent;
