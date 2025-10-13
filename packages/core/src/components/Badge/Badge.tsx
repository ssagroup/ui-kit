import React from 'react';

import {
  blue,
  blueLight,
  green,
  pink,
  purple,
  turquoise,
  yellow,
  yellowWarm,
} from '@styles/global';

import BadgeBase from './BadgeBase';
import { large, medium, small } from './styles';
import { BadgeProps } from './types';

const mapSizes: MainSizes = {
  small,
  medium,
  large,
};

const mapColors: MainColors = {
  pink,
  yellow,
  yellowWarm,
  green,
  turquoise,
  purple,
  blueLight,
  blue,
};

const Badge = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLProps<HTMLDivElement>, 'size'> & BadgeProps
>(function Badge(
  { color = 'purple', size = 'medium', children, ...props },
  ref,
) {
  const sizeProps = mapSizes[size as keyof MainSizes];
  return (
    <BadgeBase
      ref={ref}
      css={[
        color in mapColors
          ? mapColors[color as keyof MainColors]
          : {
              background: color,
            },
        sizeProps,
      ]}
      {...props}>
      {children ? children : null}
    </BadgeBase>
  );
});

export default Badge;
