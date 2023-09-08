import { useTheme } from '@emotion/react';
import { v4 as uuidv4 } from 'uuid';

import { ProgressCircleBase } from './ProgressCircleBase';
import { ProgressCircleOuter } from './ProgressCircleOuter';
import { ProgressCircleInner } from './ProgressCircleInner';
import { ProgressCircleProps } from './types';

const ProgressCircle = ({
  max,
  currentValue,
  color = 'green',
  size = 160,
  infoContent,
}: ProgressCircleProps) => {
  const theme = useTheme();

  const gradientId = `gradient-${uuidv4()}`;
  const barStroke = size / 10 / 2;
  const currentPercentage = (currentValue / max) * 100;
  const fullStroke = 2 * (22 / 7) * (size / 2 - barStroke);
  const svgOffset =
    fullStroke -
    (((2 * 22) / 7) * (size / 2 - barStroke) * currentPercentage) / 100;

  return (
    <ProgressCircleBase
      gradientId={gradientId}
      role="progressbar"
      fullStroke={fullStroke}
      svgOffset={svgOffset}
      color={color}
      size={size}>
      <ProgressCircleOuter size={size}>
        <ProgressCircleInner size={size}>{infoContent}</ProgressCircleInner>
      </ProgressCircleOuter>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={`0 0 ${size} ${size}`}
        preserveAspectRatio="xMinYMin slice"
        width="100%"
        height="100%">
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="0%" stopColor={theme.colors[color]} />
            <stop offset="100%" stopColor={theme.colors[`${color}Lighter`]} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={size / 2 - barStroke} />
      </svg>
    </ProgressCircleBase>
  );
};

export default ProgressCircle;
