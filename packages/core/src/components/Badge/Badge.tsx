import {
  blue,
  green,
  blueLight,
  pink,
  purple,
  turquoise,
  yellow,
  yellowLight,
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
  yellowLight,
  green,
  turquoise,
  purple,
  blueLight,
  blue,
};

const Badge = ({
  color = 'purple',
  size = 'medium',
  children,
  ...props
}: BadgeProps) => (
  <BadgeBase css={[mapColors[color], mapSizes[size]]} {...props}>
    {children ? children : null}
  </BadgeBase>
);

export default Badge;
