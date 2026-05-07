import { CSSObject } from '@emotion/react';
import { ReactNode } from 'react';

import {
  DynamicProps,
  GlobalSharedProps,
} from '@components/NotificationComponents/types';
import { ColorsKeys } from '@global-types/emotion';

export enum NotificationVariants {
  secondary = 'secondary',
  neutral = 'neutral',
  dark = 'dark',
}

/**
 * Per-slot style overrides for `<Notification>`.
 *
 * Cards render inside a portal, so a top-level `css` prop cannot reach inner
 * elements. Use this object to customize any part of the card without touching
 * the global theme.
 *
 * @example
 * ```tsx
 * <Notification
 *   styles={{
 *     root:  { borderRadius: 4 },
 *     title: { fontWeight: 700 },
 *     date:  { color: '#9ca3af' },
 *   }}
 * />
 * ```
 */
export interface NotificationStyleOverrides {
  /** Card wrapper — background, border-radius, padding, box-shadow, border */
  root?: CSSObject;
  /** Icon column wrapper div */
  icon?: CSSObject;
  /** Fill color for a named icon (has no effect on custom ReactNode icons) */
  iconColor?: string;
  /** Title element */
  title?: CSSObject;
  /** Date / timestamp element */
  date?: CSSObject;
  /** Description paragraph */
  description?: CSSObject;
  /** Actions row wrapper */
  actions?: CSSObject;
  /** Cancel and submit action buttons */
  actionButton?: CSSObject;
  /** Close (×) button wrapper */
  closeButton?: CSSObject;
  /** Fill color for the close (×) icon */
  closeIconColor?: string;
}

/**
 * Component-level props for the `<Notification>` portal container.
 *
 * Mount once near the app root; call `showNotification(...)` from anywhere.
 */
export interface NotificationProps extends GlobalSharedProps {
  /**
   * Default auto-dismiss duration in ms for all notifications in this stack.
   * Defaults to `undefined` — notifications persist until the user closes them.
   * Individual notifications can override this via `showNotification`.
   */
  timeout?: number;
  /** Per-slot style overrides applied after all default styles. */
  styles?: NotificationStyleOverrides;
}

/**
 * Parameters for an individual notification triggered via `showNotification(params)`.
 *
 * Only `variant` is required. Everything else is optional.
 *
 * @example
 * ```ts
 * // Minimal
 * showNotification({ variant: NotificationVariants.default, title: 'John Doe' });
 *
 * // With avatar and timestamp
 * showNotification({
 *   variant: NotificationVariants.neutral,
 *   title: 'Jane Smith',
 *   date: '5 minutes ago',
 *   description: 'Left a comment on your post.',
 *   icon: <img src={avatarUrl} alt="Jane" />,
 * });
 *
 * // With custom color
 * showNotification({
 *   variant: NotificationVariants.default,
 *   title: 'System',
 *   color: 'purple',
 *   date: 'Just now',
 * });
 * ```
 */
export interface DynamicNotificationParams extends DynamicProps {
  variant: NotificationVariants;
  /**
   * Pre-formatted timestamp string displayed next to the title (e.g. `"11 days ago"`).
   * The component renders it as-is — no internal date formatting is applied.
   */
  date?: string;
  /**
   * Icon for the left column. Accepts:
   * - A named icon string (e.g. `"user"`, `"check-circle"`) — rendered via `<Icon>`
   * - Any `ReactNode` (e.g. `<img>`, `<Avatar>`) — rendered as-is
   * - Omitted → falls back to the `"user"` icon
   */
  icon?: string | ReactNode;
  /**
   * Solid background color. Auto-derives text, icon, and border colors for contrast.
   * Accepts a theme color key (e.g. `'purple'`) or any CSS color string.
   * When provided, the variant token colors are fully ignored.
   */
  color?: ColorsKeys | string;
  /**
   * Auto-dismiss duration in ms for this specific notification.
   * Overrides the component-level `timeout`.
   * Pass `undefined` explicitly to keep this notification persistent.
   */
  timeout?: number;
}
