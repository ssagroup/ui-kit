import { useTheme } from '@emotion/react';
import { ColorsKeys } from '@global-types/emotion';
import { MainSizes } from '@global-types/global';
import Icon from '@components/Icon';
import { AvatarProps, AvatarSizes } from './types';
import { AvatarContainer, AvatarText } from './styles';

const SIZE_MAP: Record<AvatarSizes, number> = {
  [AvatarSizes.small]: 24,
  [AvatarSizes.medium]: 32,
  [AvatarSizes.large]: 46,
};

const BORDER_WIDTH_MAP: Record<keyof MainSizes, number> = {
  small: 1,
  medium: 1,
  large: 2,
};

/** Proportion of the avatar diameter used as the initials font-size. */
const TEXT_SIZE_RATIO = 0.4;

/** Proportion of the avatar diameter used as the default icon size. */
const ICON_SIZE_RATIO = 0.75;

const DEFAULT_BORDER_COLOR: ColorsKeys = 'blue';

const resolveThemeColor = (
  color: ColorsKeys | string | undefined,
  themeColors: Record<string, string | undefined>,
) => {
  if (!color) return undefined;
  if (color in themeColors) {
    return themeColors[color];
  }
  return color;
};

/**
 * Avatar - Circular component for displaying user identity.
 *
 * Renders one of three visual states based on the supplied props:
 * 1. **Custom image** — when `image` is provided, displays the photo inside a circle.
 * 2. **Colored placeholder** — when `color` and/or `text` are provided, renders a
 *    flat-color circle with up to two initials.
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
  size = AvatarSizes.medium,
  color,
  text,
  image,
  border,
  borderColor,
  css,
}: AvatarProps) => {
  const theme = useTheme();
  const sizePx = SIZE_MAP[size];
  const shouldShowBorder = border ?? Boolean(image);
  const resolvedBorderColor =
    resolveThemeColor(borderColor ?? DEFAULT_BORDER_COLOR, theme.colors) ??
    theme.colors.blue;

  const borderStyle = shouldShowBorder
    ? {
        border: `${BORDER_WIDTH_MAP[size]}px solid ${resolvedBorderColor}`,
      }
    : undefined;

  // ── Scenario 3: custom profile image ──────────────────────────────────────

  if (image) {
    return (
      <AvatarContainer
        size={sizePx}
        css={[
          {
            background: `url(${image}) center / cover no-repeat`,
          },
          borderStyle,
          css,
        ]}
        data-testid="avatar"
      />
    );
  }

  const resolvedColor =
    resolveThemeColor(color, theme.colors) ?? theme.colors.greyFocused;
  const fontSize = Math.round(sizePx * TEXT_SIZE_RATIO);

  return (
    <AvatarContainer
      size={sizePx}
      css={[{ background: resolvedColor }, borderStyle, css]}
      data-testid="avatar">
      {text ? (
        <AvatarText fontSize={fontSize}>{text.slice(0, 2)}</AvatarText>
      ) : (
        <Icon
          name="user"
          size={Math.round(sizePx * ICON_SIZE_RATIO)}
          color={theme.colors.white}
        />
      )}
    </AvatarContainer>
  );
};

export default Avatar;
