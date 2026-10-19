import { HTMLAttributes, ReactElement, ReactNode } from 'react';
import type { MapIconsType } from '@components/Icon/types';

/**
 * Header size. Sets the bar height — 64px, 84px or 92px — and the logo box.
 */
export type HeaderSize = 'small' | 'medium' | 'large';

/**
 * Header color scheme: white bar, or the dark graphite gradient.
 */
export type HeaderTheme = 'light' | 'dark';

/**
 * One entry of the Header navigation.
 *
 * A leaf item with a `path` renders as a router link. An item with `children`
 * is a group: on desktop it opens a dropdown (hover with a mouse, tap on touch
 * screens), in the mobile menu it expands in place. Groups nest two levels
 * deep at most — the third level is not rendered.
 *
 * @example
 * ```tsx
 * const items: HeaderNavItem[] = [
 *   { id: 'home', label: 'Home', path: '/' },
 *   {
 *     id: 'people',
 *     label: 'People',
 *     children: [
 *       { id: 'employees', label: 'Employees', path: '/people/employees' },
 *       { id: 'vacancies', label: 'Vacancies', path: '/people/vacancies' },
 *     ],
 *   },
 * ];
 * ```
 */
export interface HeaderNavItem {
  /** Unique key of the item within its level */
  id: string;
  /** Visible label */
  label: ReactNode;
  /**
   * Leading icon — a kit icon name, or an element rendered as-is. A string is
   * always read as an icon name; wrap anything else (an emoji, text) in an
   * element. Shown in the mobile menu and before the label on desktop.
   */
  icon?: keyof MapIconsType | ReactElement;
  /**
   * Route the item links to. Ignored on group items (those with `children`),
   * which only open their submenu; a group is highlighted when any of its
   * descendants matches the current location.
   */
  path?: string;
  /** Renders the item greyed out and not interactive */
  disabled?: boolean;
  /** Submenu items; makes this item a group */
  children?: HeaderNavItem[];
}

/**
 * Props for the Header component.
 *
 * @example
 * ```tsx
 * <Header
 *   logo={<img src="/logo.svg" alt="Acme" />}
 *   items={items}
 *   rightSide={<UserProfile {...profile} />}
 * />
 * ```
 */
export interface HeaderProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'children'
> {
  /**
   * Project logo, placed in a box of fixed height. Leave it out and the box
   * stays empty, so the layout does not shift between apps with and without
   * a logo.
   */
  logo?: ReactNode;
  /** Navigation items. Rendered centred; scrolls sideways when it overflows. */
  items?: HeaderNavItem[];
  /**
   * Right-hand content — user profile, notifications, log out, whatever the
   * app needs. Rendered as-is on every screen size.
   */
  rightSide?: ReactNode;
  /**
   * Color scheme of the bar and its menus. Named after the kit's other
   * light/dark components (TreeView, CollapsibleNavBar) — not the Emotion
   * theme.
   * @default 'light'
   */
  theme?: HeaderTheme;
  /**
   * Bar height and logo size
   * @default 'small'
   */
  size?: HeaderSize;
  /**
   * Accessible name of the navigation landmark
   * @default 'Main'
   */
  navLabel?: string;
  /**
   * Accessible name of the burger button shown below 900px
   * @default 'Open menu'
   */
  menuButtonLabel?: string;
}
