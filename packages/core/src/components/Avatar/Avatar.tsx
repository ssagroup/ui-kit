import React from 'react';
import { useTheme } from '@emotion/react';
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
import Icon from '@components/Icon';
import { AvatarProps, AvatarColor } from './types';
import { AvatarContainer, AvatarText } from './styles';

const COLOR_MAP: Record<AvatarColor, typeof pink> = {
  pink,
  yellow,
  yellowWarm,
  green,
  turquoise,
  purple,
  blueLight,
  blue,
};

const STANDARD_COLORS = new Set<string>(Object.keys(COLOR_MAP));

/** Proportion of the avatar diameter used as the initials font-size. */
const TEXT_SIZE_RATIO = 0.4;

/** Proportion of the avatar diameter used as the default icon size. */
const ICON_SIZE_RATIO = 0.75;

/**
 * Avatar - Circular component for displaying user identity.
 *
 * Renders one of three visual states based on the supplied props:
 * 1. **Custom image** — when `image` is provided, displays the photo inside a circle.
 * 2. **Colored placeholder** — when `color` and/or `text` are provided, renders a
 *    gradient circle (using the design-system palette) with up to two initials.
 * 3. **Default placeholder** — when no props are given, shows the standard user icon.
 *
 * @category Components
 * @subcategory Display
 *
 * @example
 * ```tsx
 * // Standard color + initial letter
 * <Avatar color="purple" text="J" />
 * ```
 *
 * @example
 * ```tsx
 * // Custom profile photo
 * <Avatar image="/users/jane.jpg" />
 * ```
 *
 * @example
 * ```tsx
 * // Default placeholder (no props)
 * <Avatar />
 * ```
 *
 * @example
 * ```tsx
 * // User-defined hex color + letter
 * <Avatar color="#F7931A" text="A" />
 * ```
 *
 * @see {@link UserProfile} - For a complete user-profile panel that accepts Avatar as a trigger
 */
const Avatar = ({
  size = 42,
  color,
  text,
  image,
  className,
}: AvatarProps) => {
  const theme = useTheme();

  // ── Scenario 3: custom profile image ──────────────────────────────────────
  if (image) {
    return (
      <AvatarContainer
        size={size}
        css={{
          background: `url(${image}) center / cover no-repeat`,
        }}
        className={className}
        data-testid="avatar"
      />
    );
  }

  // ── Scenario 1: colored placeholder with optional text ─────────────────────
  if (color || text) {
    // When only text is given (no color), default to grey so the circle is visible.
    const resolvedColor = color ?? theme.colors.grey;
    const colorStyle =
      color && STANDARD_COLORS.has(color)
        ? COLOR_MAP[color as AvatarColor](theme)
        : { background: resolvedColor };

    const fontSize = Math.round(size * TEXT_SIZE_RATIO);

    return (
      <AvatarContainer
        size={size}
        css={colorStyle}
        className={className}
        data-testid="avatar">
        {text && (
          <AvatarText fontSize={fontSize}>{text.slice(0, 2)}</AvatarText>
        )}
      </AvatarContainer>
    );
  }

  // ── Scenario 2: default user-icon placeholder ──────────────────────────────
  return (
    <AvatarContainer
      size={size}
      css={{ background: theme.colors.greyLighter }}
      className={className}
      data-testid="avatar">
      <Icon name="user" size={Math.round(size * ICON_SIZE_RATIO)} color={theme.colors.grey} />
    </AvatarContainer>
  );
};

export default Avatar;
