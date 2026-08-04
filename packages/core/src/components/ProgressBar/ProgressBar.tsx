import { forwardRef } from 'react';
import {
  pink,
  yellow,
  green,
  turquoise,
  purple,
  blue,
  blueLight,
  yellowWarm,
} from '@styles/global';

import { ProgressBarProps } from './types';
import { wrapper, bar } from './styles';

const mapColors: MainColors = {
  pink,
  yellow,
  green,
  turquoise,
  purple,
  blue,
  blueLight,
  yellowWarm,
};

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  function ProgressBar(
    {
      percentage,
      color = 'green',
      vertical = false,
      bgColor = 'rgba(238, 241, 247, 1)',
      size = 12,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      valueText,
    },
    ref,
  ) {
    const mapBarWrapper = {
      horizontal: {
        height: size,
        width: '100%',
      },
      vertical: {
        height: '100%',
        width: size,
      },
    };
    const mapBarContainer = {
      horizontal: {
        width: `${percentage}%`,
        height: size,
      },
      vertical: {
        width: size,
        height: `${percentage}%`,
      },
    };

    return (
      <div
        ref={ref}
        css={[wrapper, { backgroundColor: bgColor }]}
        style={{
          ...mapBarWrapper[vertical ? 'vertical' : 'horizontal'],
        }}>
        <span
          role="progressbar"
          // Without these a screen reader announces "progress bar" and nothing
          // else — no label, no value. `percentage` is already the 0-100 value
          // the visual width is derived from.
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={valueText}
          css={[bar, mapColors[color]]}
          style={mapBarContainer[vertical ? 'vertical' : 'horizontal']}></span>
      </div>
    );
  },
);

export default ProgressBar;
