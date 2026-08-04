import type { AnchorHTMLAttributes } from 'react';
import type { Interpolation, Theme } from '@emotion/react';

export interface LinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'children'
> {
  /** Destination of the anchor. */
  href: string;

  /** Link content, rendered inside a `subtitle` Typography. */
  children: React.ReactNode;

  /**
   * Where to open the link. When set to `_blank`, `rel` defaults to
   * `noopener noreferrer` unless you pass your own.
   */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];

  /** Custom CSS class name for the anchor. */
  className?: string;

  /** Emotion styles applied to the anchor. */
  css?: Interpolation<Theme>;
}
