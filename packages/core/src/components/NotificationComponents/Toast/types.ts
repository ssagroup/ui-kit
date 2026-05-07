import { JSX } from 'react';

import {
  GlobalSharedProps,
  DynamicProps,
} from '@components/NotificationComponents/types';
import { ColorsKeys } from '@global-types/emotion';

export enum ToastVariants {
  secondary = 'secondary',
  neutral = 'neutral',
  dark = 'dark',
}

/**
 * Component-level props for the `<Toast>` portal container.
 *
 * Mount once near the app root; call `showToast(...)` from anywhere.
 */
export interface ToastProps extends GlobalSharedProps {
  /**
   * Show an animated progress bar that drains over the toast's lifetime.
   * Has no effect when `timeout` is `undefined`.
   * @default false
   */
  withProgress?: boolean;
  /**
   * Default auto-dismiss duration in ms for all toasts in this stack.
   * Pass `undefined` to disable auto-dismiss entirely.
   * Individual toasts can override this via `showToast`.
   * @default 4000
   */
  timeout?: number;
  /**
   * Default color of the progress bar for all toasts in this stack.
   * Accepts a theme color key (`ColorsKeys`) or any valid CSS color string.
   * Individual toasts can override this via `showToast({ progressColor })`.
   * When a toast uses the `color` prop the progress bar automatically uses
   * the darkened shade of that color instead of this default.
   * @default theme `blueNotification`
   */
  progressColor?: ColorsKeys | string;
}

/**
 * Parameters for an individual toast triggered via `showToast(params)`.
 *
 * Only `variant` is required. Everything else is optional.
 *
 * @example
 * ```ts
 * // Minimal
 * showToast({ variant: ToastVariants.default, title: 'Saved!' });
 *
 * // With color, custom timeout, and progress bar
 * showToast({
 *   variant: ToastVariants.default,
 *   title: 'Uploading…',
 *   color: 'purple',
 *   timeout: 8000,
 *   withProgress: true,
 * });
 *
 * // Fully custom content
 * showToast({
 *   variant: ToastVariants.default,
 *   renderProp: (close) => <MyCustomCard onDismiss={close} />,
 * });
 * ```
 */
export interface DynamicToastParams extends DynamicProps {
  variant: ToastVariants;
  /**
   * Theme color key (e.g. `'blue'`, `'green'`) or any valid CSS color string.
   * When provided:
   * - Background = resolved color value
   * - Text = auto-contrast (white on dark, `greyDarker` on light)
   * - Icon = same as text on dark bg, or a 35%-darkened shade on light bg
   * - Border (when `withBorder`) = 35%-darkened shade
   * - Progress bar = 35%-darkened shade
   */
  color?: ColorsKeys | string;
  /**
   * Fully replaces the inner content of the toast card.
   * The outer wrapper (background, shadow, border, rounded corners) and the
   * progress bar still render. Receives a `close` callback to allow the custom
   * content to dismiss the toast programmatically.
   */
  renderProp?: (close: () => void) => JSX.Element;
  /**
   * Show progress bar for this specific toast.
   * Overrides the component-level `withProgress`.
   * Has no effect when the effective `timeout` is `undefined`.
   */
  withProgress?: boolean;
  /**
   * Auto-dismiss duration in ms for this specific toast.
   * Overrides the component-level `timeout`.
   * Pass `undefined` explicitly to disable auto-dismiss for this toast only.
   */
  timeout?: number;
  /**
   * Color of the progress bar for this specific toast.
   * Overrides both the component-level `progressColor` default and the
   * automatic darkened-`color` shade.
   * Accepts a theme color key (`ColorsKeys`) or any valid CSS color string.
   */
  progressColor?: ColorsKeys | string;
}
