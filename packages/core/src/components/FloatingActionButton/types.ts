import { AriaAttributes, MouseEventHandler, ReactNode } from 'react';

import { ColorsKeys } from '@global-types/emotion';
import { IconProps } from '@components/Icon/types';

/**
 * Size scale of a {@link FloatingActionButton}. Icon-only and labelled FABs
 * share one height per size: 32 / 36 / 40 / 44px.
 */
export type FloatingActionButtonSize =
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'large';

/**
 * Corner of the viewport the {@link FloatingActionButton} is fixed to.
 */
export type FloatingActionButtonPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left';

/**
 * Background color of a {@link FloatingActionButton}.
 * - `primary`: theme blue with a white icon (design default)
 * - `secondary`: light grey with a dark icon
 * - any theme color key (e.g. `'green'`) or CSS color string — the icon and
 *   label color is picked automatically for contrast
 */
export type FloatingActionButtonColor =
  | 'primary'
  | 'secondary'
  | ColorsKeys
  | (string & {});

/**
 * Icon of a FAB or of a menu action: a kit icon name, sized and colored by
 * the FAB, or any node — which then brings its own size and color.
 */
export type FloatingActionButtonIcon = IconProps['name'] | ReactNode;

/**
 * A single item of a {@link FloatingActionButton} menu.
 */
export type FloatingActionButtonAction = {
  /** Stable key for the item. */
  id: string;
  /** Icon of the item. */
  icon: FloatingActionButtonIcon;
  /**
   * Text of the item. Always its accessible name; shown next to the icon
   * unless `showActionLabels` is `false`.
   */
  label: string;
  /** Called when the item is chosen. The menu then closes. */
  onClick: () => void;
  /** Disables the item. */
  disabled?: boolean;
};

/**
 * Props of the {@link FloatingActionButton} component.
 */
export type FloatingActionButtonProps = Pick<
  AriaAttributes,
  'aria-label' | 'aria-describedby'
> & {
  /**
   * Icon of the button (of the menu trigger while the menu is closed).
   * @default 'plus'
   */
  icon?: FloatingActionButtonIcon;
  /**
   * Text shown next to the icon (the "extended" FAB). Without it the FAB is
   * icon-only and needs an `aria-label`.
   */
  label?: string;
  /**
   * Background color. Pre-defined `primary` / `secondary`, a theme color key
   * or any CSS color; custom colors get an auto-contrast icon and label.
   * @default 'primary'
   */
  color?: FloatingActionButtonColor;
  /**
   * Draws the elevation shadow under the button.
   * @default true
   */
  shadow?: boolean;
  /**
   * Corner shape: `square` keeps the 8px radius, `round` is fully rounded
   * (a circle when icon-only, a pill when labelled).
   * @default 'square'
   */
  shape?: 'square' | 'round';
  /**
   * Size of the button and of its menu items.
   * @default 'medium'
   */
  size?: FloatingActionButtonSize;
  /**
   * Disables the button (and, in menu mode, opening the menu).
   * @default false
   */
  disabled?: boolean;
  /**
   * Click handler. In menu mode it also runs, before the menu toggles.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Items of the speed-dial menu. When given, the button toggles a stack of
   * secondary FABs above it (below it for `top-*` positions).
   */
  actions?: FloatingActionButtonAction[];
  /**
   * Shows each action's `label` next to its icon. When `false` the items are
   * icon-only and the label stays as their accessible name.
   * @default true
   */
  showActionLabels?: boolean;
  /** Controlled open state of the menu. */
  open?: boolean;
  /**
   * Initial open state of the menu when uncontrolled.
   * @default false
   */
  defaultOpen?: boolean;
  /** Called when the menu opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Icon of the trigger while the menu is open.
   * @default 'cross'
   */
  openIcon?: FloatingActionButtonIcon;

  /**
   * Viewport corner the FAB is fixed to.
   * @default 'bottom-right'
   */
  position?: FloatingActionButtonPosition;
  /**
   * Distance from the corner in px — one value for both axes, or `{ x, y }`.
   * @default 24
   */
  offset?: number | { x: number; y: number };
  /** Class name of the fixed container. */
  className?: string;
};
