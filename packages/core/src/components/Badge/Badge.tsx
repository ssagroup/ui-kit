import React from 'react';
import {
  blue,
  green,
  blueLight,
  pink,
  purple,
  turquoise,
  yellow,
  yellowWarm,
} from '@styles/global';

import BadgeBase from './BadgeBase';
import { BadgeProps } from './types';
import { large, medium, small } from './styles';

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

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(function Badge(
  { color = 'purple', size = 'medium', children, ...props },
  ref,
) {
  return (
    <BadgeBase ref={ref} css={[mapColors[color], mapSizes[size]]} {...props}>
      {children ? children : null}
    </BadgeBase>
  );
});

export default Badge;
