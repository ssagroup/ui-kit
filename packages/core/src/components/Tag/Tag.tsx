import Badge from '@components/Badge';
import { css } from '@emotion/react';
import type { Interpolation, Theme } from '@emotion/react';
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
import { TagsProps, CustomTagStyles } from './types';

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

const createCustomStyles = (customStyles?: CustomTagStyles) => {
  if (!customStyles) return null;

  const styleProps: Array<Interpolation<Theme>> = [];

  if (customStyles.color) {
    styleProps.push(css`
      color: ${customStyles.color};
    `);
  }

  if (customStyles.background) {
    styleProps.push(css`
      background: ${customStyles.background};
    `);
  }

  if (customStyles.border) {
    styleProps.push(css`
      border: ${customStyles.border};
    `);
  }

  if (customStyles.boxShadow) {
    styleProps.push(css`
      box-shadow: ${customStyles.boxShadow};
    `);
  }

  if (customStyles.css) {
    styleProps.push(customStyles.css);
  }

  return styleProps;
};

const Tag = ({
  color = 'purple',
  size = 'medium',
  className,
  children,
  customStyles,
}: TagsProps) => {
  const hasCustomStyles = customStyles && Object.keys(customStyles).length > 0;
  const defaultStyles = hasCustomStyles ? null : mapColors[color];
  const customStylesArray = createCustomStyles(customStyles);

  return (
    <Badge
      color={hasCustomStyles ? 'transparent' : color}
      size={size}
      css={[defaultStyles, ...(customStylesArray || [])]}
      className={className}>
      {children}
    </Badge>
  );
};

export default Tag;
