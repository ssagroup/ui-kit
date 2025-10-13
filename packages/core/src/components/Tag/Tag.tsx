import Badge from '@components/Badge';

import {
  blue,
  blueLight,
  green,
  pink,
  purple,
  turquoise,
  yellow,
  yellowWarm,
} from './styles';
import {
  blueBorder,
  blueLightBorder,
  greenBorder,
  pinkBorder,
  purpleBorder,
  turquoiseBorder,
  yellowBorder,
  yellowWarmBorder,
} from './styles';
import { TagsProps } from './types';

const mapColors: MainColors = {
  pink: [pink, pinkBorder],
  yellow: [yellow, yellowBorder],
  green: [green, greenBorder],
  turquoise: [turquoise, turquoiseBorder],
  purple: [purple, purpleBorder],
  blueLight: [blueLight, blueLightBorder],
  blue: [blue, blueBorder],
  yellowWarm: [yellowWarm, yellowWarmBorder],
};

const Tag = ({
  color = 'purple',
  size = 'medium',
  className,
  children,
}: TagsProps) => (
  <Badge color={color} size={size} css={mapColors[color]} className={className}>
    {children}
  </Badge>
);

export default Tag;
