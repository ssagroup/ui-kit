/**
 * Standard design-system color names supported by Avatar.
 * These map to the gradient color styles defined in `@styles/global`.
 */
export type AvatarColor =
  | 'pink'
  | 'yellow'
  | 'yellowWarm'
  | 'green'
  | 'turquoise'
  | 'purple'
  | 'blueLight'
  | 'blue';

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
   * Diameter of the avatar circle in pixels.
   * @default 42
   */
  size?: number;
  /**
   * Background color of the placeholder circle.
   * Accepts a standard design-system color name (e.g. `'purple'`, `'green'`)
   * or any valid CSS color string (e.g. `'#F7931A'`, `'rgb(0,128,0)'`).
   */
  color?: AvatarColor | string;
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
  /** Optional CSS class name forwarded to the root element. */
  className?: string;
}
