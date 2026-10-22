import { HTMLAttributes, ReactNode } from 'react';

/**
 * Footer size: the text size of the bottom bar — 14px, 16px or 20px — and so
 * its height, 42px, 48px or 52px. The extended footer is always medium.
 */
export type FooterSize = 'small' | 'medium' | 'large';

/**
 * Footer color scheme: the light grey bar, or the dark graphite gradient the
 * Header uses.
 */
export type FooterTheme = 'light' | 'dark';

/**
 * One link of the Footer — a legal link in the bottom bar, or a line of a
 * navigation column.
 *
 * Give it a `path` to render a react-router link (the Footer must then sit
 * inside a router), or an `href` for a plain anchor — a page on another site,
 * a `mailto:`. With neither it renders as plain text.
 *
 * @example
 * ```tsx
 * const links: FooterLink[] = [
 *   { id: 'privacy', label: 'Privacy Policy', path: '/privacy' },
 *   { id: 'terms', label: 'Terms & Conditions', href: 'https://example.com/terms' },
 * ];
 * ```
 */
export interface FooterLink {
  /** Unique key of the link within its list */
  id: string;
  /** Visible label */
  label: ReactNode;
  /** In-app route, rendered as a react-router link. Wins over `href`. */
  path?: string;
  /** Address of a plain anchor, for links outside the app */
  href?: string;
}

/**
 * A navigation column of the extended Footer: a bold title over a list of
 * links.
 *
 * @example
 * ```tsx
 * const column: FooterColumn = {
 *   id: 'company',
 *   title: 'Company',
 *   links: [
 *     { id: 'about', label: 'About us', path: '/about' },
 *     { id: 'careers', label: 'Careers', path: '/careers' },
 *   ],
 * };
 * ```
 */
export interface FooterColumn {
  /** Unique key of the column */
  id: string;
  /** Column title; also names the column's navigation landmark */
  title: ReactNode;
  /** Links listed under the title */
  links: FooterLink[];
}

/**
 * Props for the Footer component.
 *
 * @example
 * ```tsx
 * <Footer
 *   copyright="Acme © 2007-2026. All rights reserved."
 *   links={[{ id: 'privacy', label: 'Privacy Policy', path: '/privacy' }]}
 * />
 * ```
 */
export interface FooterProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'children'
> {
  /** Copyright line, on the left of the bottom bar */
  copyright?: ReactNode;
  /** Legal links — privacy policy, terms — on the right of the bottom bar */
  links?: FooterLink[];
  /**
   * Project logo, at the top left of the extended footer, in a 64px high box.
   * Passing it makes the footer extended.
   */
  logo?: ReactNode;
  /**
   * Short text under the logo — a tagline, the company name. Passing it makes
   * the footer extended.
   */
  description?: ReactNode;
  /**
   * Navigation columns on the right of the extended footer. Passing any makes
   * the footer extended.
   */
  columns?: FooterColumn[];
  /**
   * Color scheme. Named after the kit's other light/dark components (Header,
   * TreeView) — not the Emotion theme.
   * @default 'light'
   */
  theme?: FooterTheme;
  /**
   * Text size and height of the bottom bar. Ignored by the extended footer,
   * which the design only has in medium.
   * @default 'small'
   */
  size?: FooterSize;
  /**
   * Accessible name of the legal links' navigation landmark
   * @default 'Legal'
   */
  linksLabel?: string;
}
