import Badge from '@components/Badge';
import {
  blue,
  green,
  blueLight,
  pink,
  purple,
  turquoise,
  yellow,
} from '@styles/global';

import {
  pinkBorder,
  yellowBorder,
  greenBorder,
  turquoiseBorder,
  purpleBorder,
  blueLightBorder,
  blueBorder,
} from './styles';
import { TagsProps } from './Tag.types';

const mapColors: MainColors = {
  pink: [pink, pinkBorder],
  yellow: [yellow, yellowBorder],
  green: [green, greenBorder],
  turquoise: [turquoise, turquoiseBorder],
  purple: [purple, purpleBorder],
  blueLight: [blueLight, blueLightBorder],
  blue: [blue, blueBorder],
};

const Tag = ({ color = 'purple', size = 'medium', children }: TagsProps) => (
  <Badge color={color} size={size} css={mapColors[color]}>
    {children}
  </Badge>
);

export default Tag;
