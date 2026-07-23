import { Interpolation, Theme } from '@emotion/react';
import { To } from 'react-router-dom';
import { CommonProps } from '@global-types/emotion';

/**
 * A sibling route option shown in a breadcrumb's hover menu.
 *
 * Reserved for the route-aware mode (Mode 2): when a crumb carries `siblings`,
 * the crumb becomes a hover target that reveals these alternative routes.
 */
export interface BreadcrumbSibling {
  label: React.ReactNode;
  to: To;
}

/**
 * A single breadcrumb entry.
 *
 * In the "dummy" mode you build these by hand. In the future route-aware mode
 * the same shape is produced from the router matches, so the presentational
 * `Breadcrumbs` component never needs to know which mode produced it.
 */
export interface BreadcrumbItem {
  /** Visible label for the crumb. */
  label: React.ReactNode;
  /**
   * react-router destination. Omit for a non-navigable crumb (e.g. the current
   * page). When present, the crumb navigates via react-router.
   */
  to?: To;
  /**
   * Force the "current page" styling (blue, semibold, non-link). When not set,
   * the last item in the list is treated as current automatically.
   */
  isCurrent?: boolean;
  /** Optional click handler, fired in addition to navigation. */
  onClick?: () => void;
  /**
   * Sibling routes for this crumb. When provided, the crumb reveals a hover
   * menu offering these alternatives. Populated by the route-aware mode.
   */
  siblings?: BreadcrumbSibling[];
}

export interface BreadcrumbsProps extends CommonProps {
  /** Ordered list of crumbs, root first, current page last. */
  items: BreadcrumbItem[];
  /**
   * Collapse the trail into `first … last` once the number of items exceeds
   * this value. The collapsed middle crumbs are revealed from the `…` menu.
   * When omitted, the full trail is always shown.
   */
  maxItems?: number;
  /** Custom separator between crumbs. Defaults to a right chevron. */
  separator?: React.ReactNode;
  /** Accessible label for the wrapping `nav`. */
  ariaLabel?: string;
  /** Custom Emotion styles applied to the wrapping `nav`. */
  css?: Interpolation<Theme>;
}
