import Badge from '@components/Badge';
import {
  blue,
  green,
  blueLight,
  pink,
  purple,
  turquoise,
  yellow,
  yellowWarm,
} from './styles';

import {
  pinkBorder,
  yellowBorder,
  greenBorder,
  turquoiseBorder,
  purpleBorder,
  blueLightBorder,
  blueBorder,
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
  extraCSS,
  children,
}: TagsProps) => (
  <Badge color={color} size={size} css={[mapColors[color], extraCSS]}>
    {children}
  </Badge>
);

export default Tag;
