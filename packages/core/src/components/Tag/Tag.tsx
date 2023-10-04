import Badge from '@components/Badge';
import {
  blue,
  green,
  blueLight,
  pink,
  purple,
  turquoise,
  yellow,
  yellowLight,
} from './styles';

import {
  pinkBorder,
  yellowBorder,
  greenBorder,
  turquoiseBorder,
  purpleBorder,
  blueLightBorder,
  blueBorder,
  yellowLightBorder,
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
  yellowLight: [yellowLight, yellowLightBorder],
};

const Tag = ({ color = 'purple', size = 'medium', children }: TagsProps) => (
  <Badge color={color} size={size} css={mapColors[color]}>
    {children}
  </Badge>
);

export default Tag;
