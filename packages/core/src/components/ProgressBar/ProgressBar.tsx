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
          css={[bar, mapColors[color]]}
          style={mapBarContainer[vertical ? 'vertical' : 'horizontal']}></span>
      </div>
    );
  },
);

export default ProgressBar;
