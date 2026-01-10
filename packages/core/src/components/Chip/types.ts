import { CommonProps } from '@global-types/emotion';
import { Interpolation, Theme } from '@emotion/react';
import { ReactNode, MouseEventHandler } from 'react';
import { IconProps } from '@components/Icon/types';

/**
 * Visual style variant for Chip component
 * - `filled`: Solid background with text (default)
 * - `outlined`: Transparent background with border
 */
export type ChipVariant = 'filled' | 'outlined';

/**
 * Color theme for Chip component
 * - `default`: Neutral gray color scheme
 * - `primary`: Primary brand color
 * - `success`: Green success color
 * - `error`: Red error color
 * - `info`: Blue informational color
 * - `warning`: Orange/yellow warning color
 */
export type ChipColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';

/**
 * Size variant for Chip component
 * - `small`: Compact chip for dense UIs
 * - `medium`: Standard chip size (default)
 * - `large`: Larger chip for emphasis
 */
export type ChipSize = 'small' | 'medium' | 'large';

/**
 * Props for the Chip component
 *
 * A versatile chip component for displaying compact pieces of information, tags,
 * or removable items. Supports icons, avatars, click handlers, and delete actions.
 * Fully accessible with keyboard support and ARIA attributes.
 *
 * @example
 * ```tsx
 * // Basic chip
 * <Chip label="React" />
 * ```
 *
 * @example
 * ```tsx
 * // Chip with icon and delete
 * <Chip
 *   label="TypeScript"
 *   icon="check"
 *   onDelete={(e) => handleRemove(e)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Clickable chip with avatar
 * <Chip
 *   label="John Doe"
 *   avatar={<Avatar size={20} image="/avatar.jpg" />}
 *   onClick={() => navigateToProfile()}
 *   color="primary"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Outlined variant with custom color
 * <Chip
 *   label="New"
 *   variant="outlined"
 *   color="success"
 *   size="small"
 * />
 * ```
 */
export interface ChipProps extends CommonProps {
  /**
   * Main text content of the chip
   * Can be a string, number, or React node
   */
  label: ReactNode;

  /**
   * Optional title/heading text displayed before the label
   * Useful for chips with additional context
   */
  title?: ReactNode;

  /**
   * Visual style variant
   * - `filled`: Solid background (default)
   * - `outlined`: Transparent with border
   * @default 'filled'
   */
  variant?: ChipVariant;

  /**
   * Color theme for the chip
   * @default 'default'
   */
  color?: ChipColor;

  /**
   * Size of the chip
   * @default 'medium'
   */
  size?: ChipSize;

  /**
   * Whether the chip is disabled
   * Disabled chips cannot be clicked or deleted
   * @default false
   */
  disabled?: boolean;

  /**
   * Icon name to display before the label
   * Uses the Icon component internally
   * Defaults to 'plus' if showIcon is true and no icon provided
   */
  icon?: IconProps['name'];

  /**
   * Avatar component or image to display before the label
   * Takes precedence over icon if both are provided
   */
  avatar?: ReactNode;

  /**
   * Delete button click handler
   * When provided, a delete icon button appears on the chip
   * Keyboard: Delete or Backspace keys trigger deletion
   */
  onDelete?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Custom icon name for the delete button
   * @default 'cross'
   */
  deleteIcon?: IconProps['name'];

  /**
   * Whether to show the leading icon
   * If false, no icon will be displayed even if icon prop is provided
   * @default true
   */
  showIcon?: boolean;

  /**
   * Click handler for the chip
   * Makes the chip clickable/interactive
   */
  onClick?: MouseEventHandler<HTMLDivElement>;

  /**
   * Explicitly mark chip as clickable
   * Used to enable pointer cursor and keyboard interaction
   * Automatically true if onClick is provided
   */
  clickable?: boolean;

  /**
   * Custom Emotion CSS styles
   */
  css?: Interpolation<Theme>;
}
