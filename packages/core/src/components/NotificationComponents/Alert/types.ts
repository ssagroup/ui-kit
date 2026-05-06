import { CSSObject } from '@emotion/react';

import {
  GlobalSharedProps,
  DynamicProps,
} from '@components/NotificationComponents/types';

export enum AlertVariants {
  success = 'success',
  warning = 'warning',
  error = 'error',
  hint = 'hint',
  neutral = 'neutral',
  default = 'default',
}

/**
 * Per-slot style overrides for `<Alert>`.
 *
 * Because the alert cards are rendered inside a portal, a top-level `css` prop
 * cannot reach the inner elements. Use this object instead to customize any
 * part of the card without touching the global theme.
 *
 * CSS slots accept any `CSSObject` and are merged **after** the default styles,
 * so they always win. The two `*Color` fields exist because `<Icon>` receives
 * its fill via a prop rather than CSS inheritance.
 *
 * @example
 * ```tsx
 * <Alert
 *   styles={{
 *     root: { background: '#1a1a2e', borderRadius: 4 },
 *     title: { color: '#ffffff', fontSize: 15 },
 *     description: { color: 'rgba(255,255,255,0.65)' },
 *     actionButton: { color: '#a78bfa' },
 *     iconColor: '#a78bfa',
 *     closeIconColor: 'rgba(255,255,255,0.5)',
 *   }}
 * />
 * ```
 */
export interface AlertStyleOverrides {
  /** Card wrapper — background, border-radius, padding, box-shadow, border, etc. */
  root?: CSSObject;
  /** Status icon wrapper div */
  icon?: CSSObject;
  /** Fill color for the status icon (overrides the variant's default icon color) */
  iconColor?: string;
  /** Title element */
  title?: CSSObject;
  /** Description element */
  description?: CSSObject;
  /** Actions row wrapper */
  actions?: CSSObject;
  /** Cancel and submit action buttons */
  actionButton?: CSSObject;
  /** Close (×) button wrapper */
  closeButton?: CSSObject;
  /** Fill color for the close (×) icon (overrides theme default / inheritMainColor value) */
  closeIconColor?: string;
}

export interface AlertProps extends GlobalSharedProps {
  inheritMainColor?: boolean;
  /** Per-slot style overrides. Applied after all default styles. */
  styles?: AlertStyleOverrides;
}

export interface DynamicAlertParams extends DynamicProps {
  variant: AlertVariants;
}
