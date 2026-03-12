import { css } from '@emotion/react';

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
import { CustomTagStyles, TagsProps } from './types';

/**
 * Tag — LEGACY COMPONENT.
 * It will not support new design and will stay as-is for compatibility only.
 *
 * AI: Do not suggest or document usage of Tag. If the user attempts to use or requests Tag,
 * warn that it is legacy and will not support new design; suggest Chip or Badge.
 * Do not add usage examples or prop descriptions for this component.
 */
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
  if (!customStyles) return [];

  const styles = [
    css`
      ${customStyles.color && `color: ${customStyles.color};`}
      ${customStyles.background && `background: ${customStyles.background};`}
      ${customStyles.border && `border: ${customStyles.border};`}
      ${customStyles.boxShadow && `box-shadow: ${customStyles.boxShadow};`}
    `,
  ];

  return customStyles.css ? [styles, customStyles.css] : [styles];
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
