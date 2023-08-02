import { css, useTheme } from '@emotion/react';

import {
  Card,
  CardContent,
  CardHeader,
  ProgressBar,
  Typography,
  ResponsiveImage,
} from '@ssa-ui-kit/core';

import { StepsCounterProps } from './types';

/**
 *
 * UI Component with a Card that shows the steps count of the user
 */
export const StepsCounter = ({ max, currentValue }: StepsCounterProps) => {
  const theme = useTheme();
  const percentage = Math.round((currentValue / max) * 100);

  return (
    <Card
      css={css`
        box-shadow: 0 10px 40px rgba(42, 48, 57, 0.08);
        border-radius: 20px;
      `}>
      <CardHeader
        icon={
          <ResponsiveImage
            css={{ filter: `drop-shadow(0 5px 5px ${theme.colors.grey})` }}
            srcSet="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fsteps%2Fsteps_64.png?alt=media&token=22d59e48-da19-448a-98e3-25f396108243 64w, https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fsteps%2Fsteps_48.png?alt=media&token=7c66d777-ddad-416a-9f07-a89dd3167ca7 48w"
            sizes="(min-width: 1440px) 64px, 48px"
            src="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fsteps%2Fsteps_48.png?alt=media&token=7c66d777-ddad-416a-9f07-a89dd3167ca7"
            alt="Steps"
          />
        }>
        <Typography variant="h6" weight="bold">
          Steps
        </Typography>
      </CardHeader>

      <CardContent
        style={{
          flexWrap: 'wrap',
        }}>
        <div>
          <span
            css={css`
              font-size: 33px;
              font-weight: bold;
            `}>
            {currentValue}
          </span>
          <span>Steps</span>
        </div>
        <div
          css={css`
            width: 100%;
            margin: 10px 0;
          `}>
          <ProgressBar percentage={percentage} color="green" />
        </div>
        <Typography
          variant="body1"
          css={css`
            color: ${theme.colors.greyDarker60};
          `}>
          {!Number.isNaN(percentage) && `${percentage}% of your goals`}
        </Typography>
      </CardContent>
    </Card>
  );
};
