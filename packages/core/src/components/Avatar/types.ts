import { Interpolation, Theme } from '@emotion/react';
import { ColorsKeys } from '@global-types/emotion';

export enum AvatarSizes {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

/**
 * Props for the Avatar component.
 *
 * Display priority:
 * 1. `image` — renders the supplied URL as a circular photo.
 * 2. `color` / `text` — renders a colored placeholder circle with up to two letters.
 * 3. No props (or only `size`) — renders the default user-icon placeholder.
 *
 * @example
 * ```tsx
 * // Standard color + initial letter
 * <Avatar color="purple" text="J" />
 *
 * // Custom profile photo
 * <Avatar image="/users/jane.jpg" />
 *
 * // Default placeholder
 * <Avatar />
 *
 * // User-defined hex color and letter
 * <Avatar color="#F7931A" text="A" />
 * ```
 */
export interface AvatarProps {
  /**
   * Avatar size variant.
   * @default AvatarSizes.medium
   */
  size?: AvatarSizes;
  /**
   * Background color of the placeholder circle.
   * Accepts a `theme.colors` key (e.g. `'purple'`, `'green'`)
   * or any valid CSS color string (e.g. `'#F7931A'`, `'rgb(0,128,0)'`).
   */
  color?: ColorsKeys | string;
  /**
   * One or two characters displayed inside the colored placeholder.
   * Only the first two characters are rendered.
   */
  text?: string;
  /**
   * URL of the user's profile photo.
   * When provided, the image is displayed instead of the placeholder.
   */
  image?: string;
  /**
   * Shows or hides the avatar border.
   * Defaults to visible for image avatars and hidden otherwise.
   */
  border?: boolean;
  /**
   * Border color. Accepts a `theme.colors` key or any CSS color string.
   */
  borderColor?: ColorsKeys | string;
  /**
   * Emotion CSS override applied after all internal styles.
   */
  css?: Interpolation<Theme>;
}
