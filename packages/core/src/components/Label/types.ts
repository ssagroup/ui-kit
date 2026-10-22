import { MouseEventHandler, ReactNode } from 'react';
import { CommonProps } from '@global-types/emotion';
import { ChipProps } from '@components/Chip/types';

/**
 * A small status pill shown to the right of a field label — "mapped",
 * "default", "not present in the CV". Rendered as an outlined Chip.
 *
 * The badge sits next to the `<label>` element, not inside it, so it does
 * not become part of the field's accessible name. Point the control's
 * `aria-describedby` at its `id` to have it announced as a description —
 * the kit's fields with a `labelBadge` prop do this for you.
 *
 * @example
 * ```tsx
 * const badge: LabelBadge = { text: 'mapped', color: 'primary' };
 * const custom: LabelBadge = { text: 'not present in the CV', color: '#ff8a00' };
 * ```
 */
export interface LabelBadge {
  /** Badge text */
  text: ReactNode;
  /**
   * A Chip color: `primary`, `success`, `warning`… , any theme color key
   * (e.g. `'purple'`) or a CSS color (e.g. `'#ff8a00'`).
   * @default 'default'
   */
  color?: ChipProps['color'];
  /**
   * `id` of the badge element, for the control's `aria-describedby`
   * @default `${htmlFor}-badge`, or a generated id without `htmlFor`
   */
  id?: string;
}

export interface LabelProps extends CommonProps {
  htmlFor?: string;
  /** `id` of the `<label>` element, e.g. for a control's `aria-labelledby` */
  id?: string;
  children: React.ReactNode;
  /** Status badge shown to the right of the label text */
  badge?: LabelBadge;
  /** Renders the label in its muted, disabled state. */
  disabled?: boolean;
  /**
   * @deprecated Use `disabled` instead. Removed in the next major release.
   */
  isDisabled?: boolean;
  onMouseEnter?: MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: MouseEventHandler<HTMLLabelElement>;
}
