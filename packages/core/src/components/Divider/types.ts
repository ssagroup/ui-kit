import { CSSProperties, ReactNode } from 'react';

import { ColorsKeys } from '@global-types/emotion';
import { IconProps } from '@components/Icon/types';

/** Direction of a {@link Divider}: a line across or a line down. */
export type DividerOrientation = 'horizontal' | 'vertical';

/** Line style of a {@link Divider}. Dashes and dots have round ends. */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

/** Line thickness of a {@link Divider}: 1px, 2px or 3px. */
export type DividerSize = 'small' | 'medium' | 'large';

/**
 * Colour of a {@link Divider}.
 *
 * - `subtle`: light grey line (design default)
 * - `strong`: darker, semi-transparent grey line
 * - any theme color key (e.g. `'blue'`) or CSS color string
 *
 * With `subtle` and `strong` only the line takes the colour: text and icon keep
 * the design's dark grey. A custom colour paints the line, the text and the
 * icon. A node passed as children inherits it but can set its own.
 */
export type DividerColor = 'subtle' | 'strong' | ColorsKeys | (string & {});

/** Length of a divider side: a number is pixels, a string any CSS length. */
export type DividerLength = number | string;

/** Props shared by every {@link Divider}, with or without content. */
export interface DividerBaseProps {
  /** `horizontal` (default) or `vertical`. */
  orientation?: DividerOrientation;
  /** `solid` (default), `dashed` or `dotted`. */
  variant?: DividerVariant;
  /** Line thickness: `small` (1px, default), `medium` (2px), `large` (3px). */
  size?: DividerSize;
  /** Line colour, and text/icon colour when custom. Defaults to `subtle`. */
  color?: DividerColor;
  /**
   * Width of a horizontal divider or height of a vertical one. Defaults to
   * `100%`. A vertical divider without `length` stretches to the height of
   * its flex row, or fills a parent with a fixed height.
   */
  length?: DividerLength;
  /** Space between the line and the content, in px. Defaults to 12. */
  gap?: number;
  /**
   * Empty space on both sides of the line, in px: above and below a
   * horizontal divider, left and right of a vertical one. Defaults to 8, so
   * the divider keeps clear of its neighbours even in a parent with no gap.
   * Set 0 to remove it.
   */
  spacing?: number;
  /** Font size of text content. Defaults to 14px. */
  fontSize?: number | string;
  /** Size of the `icon`, in px. Defaults to 20. */
  iconSize?: number;
  /**
   * Accessible name of the divider. Defaults to the text when the content is
   * a string.
   */
  'aria-label'?: string;
  className?: string;
  style?: CSSProperties;
}

/** Content of a {@link Divider}: a kit icon or any node, not both. */
export type DividerContentProps =
  | {
      /** Kit icon shown in the middle, sized by `iconSize`. */
      icon: IconProps['name'];
      children?: never;
    }
  | {
      icon?: never;
      /**
       * Content shown in the middle. A string or number is styled as the
       * divider's text; any other node is rendered as is and keeps its own
       * colours.
       */
      children?: ReactNode;
    };

/**
 * Props of {@link Divider}, a line that separates content horizontally or
 * vertically, with optional text, icon or node in the middle.
 */
export type DividerProps = DividerBaseProps & DividerContentProps;
