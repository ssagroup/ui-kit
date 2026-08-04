import { useId } from 'react';
import { useTheme } from '@emotion/react';
import { ColorsKeys } from '@global-types/emotion';

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
  mode = 'default',
  classnames,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: ProgressCircleProps) => {
  const theme = useTheme();
  const gradientId = useId();

  const barStroke = size / 10 / 2;
  const currentPercentage = (currentValue / max) * 100;
  const fullStroke = 2 * (22 / 7) * (size / 2 - barStroke);
  const svgOffset =
    fullStroke -
    (((2 * 22) / 7) * (size / 2 - barStroke) * currentPercentage) / 100;
  const colorName = `${color}Lighter` as ColorsKeys;
  const colorValue = theme.colors[colorName] || theme.colors[color];

  return (
    <ProgressCircleBase
      gradientId={gradientId}
      role="progressbar"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      // `mode="infinite"` is an indeterminate spinner: per ARIA, omitting
      // aria-valuenow is what signals "unknown progress".
      aria-valuenow={mode === 'infinite' ? undefined : currentValue}
      aria-valuemin={mode === 'infinite' ? undefined : 0}
      aria-valuemax={mode === 'infinite' ? undefined : max}
      fullStroke={fullStroke}
      svgOffset={svgOffset}
      color={color}
      size={size}
      mode={mode}
      className={classnames?.root}>
      <ProgressCircleOuter size={size} className={classnames?.outer}>
        <ProgressCircleInner size={size} className={classnames?.inner}>
          {infoContent}
        </ProgressCircleInner>
      </ProgressCircleOuter>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={`0 0 ${size} ${size}`}
        preserveAspectRatio="xMinYMin slice"
        width="100%"
        height="100%"
        className={classnames?.svg}>
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="0%" stopColor={theme.colors[color]} />
            <stop offset="100%" stopColor={colorValue} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - barStroke}
          className={classnames?.svgCircle}
        />
      </svg>
    </ProgressCircleBase>
  );
};

export default ProgressCircle;
