import { useTheme } from '@emotion/react';
import { Typography, Wrapper } from '@ssa-ui-kit/core';

import { ICaloriesProps } from './types';

export const InnerContent = ({ currentValue, max }: ICaloriesProps) => {
  const theme = useTheme();
  return (
    <div
      style={{
        display: 'grid',
        textAlign: 'center',
      }}>
      <Wrapper alignItems="baseline" direction="row" css={{ gap: 5 }}>
        <Typography variant="h5" weight="bold" color={theme.colors.greyDarker}>
          {currentValue}
        </Typography>
        <Typography
          variant="subtitle"
          weight="bold"
          color={theme.colors.greyDarker}>
          kcal
        </Typography>
      </Wrapper>
      <Typography variant="subtitle" color={theme.colors.greyDarker60}>
        {(currentValue / max) * 100}% done
      </Typography>
    </div>
  );
};
