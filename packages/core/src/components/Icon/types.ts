import React from 'react';
import { iconsList } from './icons/iconsList';

export interface SVGProps extends React.SVGProps<SVGSVGElement> {
  /** Width and height in px. Icons are square, so one value sets both. */
  size?: number;
}

export interface IconProps extends Omit<SVGProps, 'fill'> {
  /**
   * Which icon to render. Type-checked against the generated icon list, so a
   * name that does not exist is a compile error rather than a blank render.
   * Browse the set under "Design System / Icons" in Storybook.
   */
  name: keyof MapIconsType;
  /**
   * Tooltip text shown on hover. Also becomes the icon's `aria-label`.
   *
   * Opt-in: without it the icon renders as decorative, with no accessible name.
   * Supplying it wraps the icon in an extra inline-flex `span` — see the note on
   * the component about layout impact.
   */
  tooltip?: string;
}

export type MapIconsType = {
  [key in (typeof iconsList)[number]]: React.ElementType;
};
