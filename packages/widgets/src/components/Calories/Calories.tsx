import { css, useTheme } from '@emotion/react';

import {
  Card,
  CardContent,
  CardHeader,
  ProgressCircle,
  Typography,
  ResponsiveImage,
} from '@ssa-ui-kit/core';

import { ICaloriesProps } from './types';
import { InnerContent } from './innerContent';

/**
 *
 * UI Component that shows how many calories the user has burned
 */
export const Calories = ({ max, currentValue }: ICaloriesProps) => {
  const theme = useTheme();

  return (
    <Card
      css={css`
        box-shadow: 0px 10px 40px rgba(42, 48, 57, 0.08);
        border-radius: 20px;
      `}>
      <CardHeader
        icon={
          <ResponsiveImage
            css={{ filter: `drop-shadow(0px 5px 5px ${theme.colors.grey})` }}
            srcSet="/img/calories/calories_64.png 64w, /img/calories/calories_48.png 48w"
            sizes="(min-width: 1440px) 64px, 48px"
            src="/img/calories/calories_48.png"
            alt="Calories burn"
          />
        }>
        <Typography variant="h6" weight="bold">
          Calories
        </Typography>
      </CardHeader>

      <CardContent>
        <ProgressCircle
          max={max}
          currentValue={currentValue}
          color="pink"
          infoContent={<InnerContent max={max} currentValue={currentValue} />}
          size={120}
        />
      </CardContent>
    </Card>
  );
};
