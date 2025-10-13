import { useEffect, useMemo, useState } from 'react';

import { css, useTheme } from '@emotion/react';
import { linearGradientDef } from '@nivo/core';
import { Point } from '@nivo/line';

import {
  Card,
  CardContent,
  CardHeader,
  ResponsiveImage,
  Typography,
} from '@ssa-ui-kit/core';

import { throttle } from '@ssa-ui-kit/utils';

import { BPM } from './BPM';
import { HeartRateLineChart } from './HeartRateLineChart';
import { HeartRateProps } from './types';

const gradientId = 'HeartRateGradient';
const chartFill = [{ match: '*' as const, id: gradientId }];

/**
 *
 * UI Component that shows the heart rate of the user
 */
export const HeartRate = ({
  data,
  caption = 'Heart Rate',
  color,
}: HeartRateProps) => {
  const [bpmValue, setBpmValue] = useState<number>(
    data?.data?.[0]?.y as number,
  );
  const [onBpmValueChange, cancelTimer] = useMemo(
    () =>
      throttle((point: Point) => setBpmValue(point?.data?.y as number), 100),
    [],
  );

  const theme = useTheme();
  const chartColor = color || theme.colors.purpleDark;

  useEffect(() => () => cancelTimer(), []);

  useEffect(() => {
    setBpmValue(data?.data?.[0]?.y as number);
  }, [data]);

  const gradientDefs = useMemo(
    () => [
      linearGradientDef(gradientId, [
        { offset: 100, color: chartColor as string },
        { offset: 0, color: chartColor as string },
      ]),
    ],
    [chartColor],
  );

  const chartProps = useMemo(
    () => ({
      data: [data],
      colors: chartColor,
    }),
    [data, chartColor],
  );

  return (
    <Card
      css={css`
        box-shadow: 0 10px 40px rgba(42, 48, 57, 0.08);
        border-radius: 20px;
      `}>
      <CardHeader
        icon={
          <ResponsiveImage
            css={{ filter: `drop-shadow(0px 5px 5px ${theme.colors.grey})` }}
            srcSet="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fheart%2Fheart_64.png?alt=media&token=aca1639b-62f5-44ed-a0d1-3cea8e4797e2 64w, https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fheart%2Fheart_48.png?alt=media&token=7ef68a25-5362-48b9-b359-c46b48d1db54 48w"
            sizes="(min-width: 1440px) 64px, 48px"
            src="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fheart%2Fheart_48.png?alt=media&token=7ef68a25-5362-48b9-b359-c46b48d1db54"
            alt="Heart"
          />
        }>
        <Typography variant="h5" weight="bold">
          {caption}
        </Typography>
      </CardHeader>
      <CardContent direction="column" css={{ width: '100%' }}>
        <div
          css={css`
            height: 65px;
            width: calc(100% + 40px);
            margin-inline: -20px;
          `}>
          <HeartRateLineChart
            {...chartProps}
            fill={chartFill}
            defs={gradientDefs}
            onMouseMove={onBpmValueChange}
          />
        </div>
        {bpmValue != null ? <BPM value={bpmValue} /> : null}
      </CardContent>
    </Card>
  );
};
