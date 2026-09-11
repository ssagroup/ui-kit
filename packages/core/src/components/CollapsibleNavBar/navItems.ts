import { CSSObject } from '@emotion/react';
import { PathPattern, matchPath } from 'react-router-dom';

import { CustomIconProps } from '@components/NavBar/types';
import { TreeItem } from '../TreeView';

import {
  CollapsibleNavBarExtendedProps,
  CollapsibleNavBarGroup,
  CollapsibleNavBarItem,
} from './types';

/**
 * What a nav row needs beyond a label — carried on each `TreeView` node so the
 * tree itself stays free of routing concepts.
 */
export interface NavItemMeta {
  /** Resolved `to` for the row's link. Absent on groups, which don't navigate. */
  to?: string;
  /**
   * Taken from the nav item's own type rather than restated as
   * `keyof MapIconsType`. `CollapsibleNavBarItem` reaches that union through
   * the package index, where it has already widened to `string`; restating it
   * here would put the two sides of the mapping in disagreement.
   */
  iconName?: CollapsibleNavBarItem['iconName'];
  iconSize?: number;
  css?: CSSObject;
  CustomIcon?: CustomIconProps;
  /** Group prefix, used to build sub-item paths and to match the active route. */
  prefix?: string;
  /** A group's children, kept flat for the collapsed-rail popover. */
  subItems?: Array<{ path: string; title: string }>;
}

export type NavTreeItem = TreeItem<NavItemMeta>;

const isGroup = (
  item: CollapsibleNavBarExtendedProps['items'][number],
): item is CollapsibleNavBarGroup => 'items' in item;

/** External links pass through untouched; everything else is app-absolute. */
export const resolveTo = (path: string) =>
  path.includes('://') ? path : '/' + path;

/**
 * Turns the nav bar's flat `items` prop into `TreeView` nodes.
 *
 * Ids are the resolved paths (prefix for a group), which makes them stable
 * across renders and directly comparable with the current location.
 */
export const toTreeItems = (
  items: CollapsibleNavBarExtendedProps['items'],
): NavTreeItem[] =>
  items.map((item): NavTreeItem => {
    const shared: { label: string; meta: NavItemMeta } = {
      label: item.title,
      meta: {
        iconName: item.iconName,
        iconSize: item.iconSize,
        css: item.css,
        CustomIcon: item.CustomIcon,
      },
    };

    if (!isGroup(item)) {
      return {
        ...shared,
        id: resolveTo(item.path),
        meta: { ...shared.meta, to: resolveTo(item.path) },
      };
    }

    const prefix = item.prefix ?? '';

    return {
      ...shared,
      id: prefix || item.title,
      meta: { ...shared.meta, prefix, subItems: item.items },
      items: item.items.map((subItem) => ({
        id: resolveTo(prefix + subItem.path),
        label: subItem.title,
        meta: { to: resolveTo(prefix + subItem.path) },
      })),
    };
  });

/**
 * Ids of the nodes the current location activates — the row itself plus, for a
 * sub-route, its group.
 *
 * This replaces the old approach of reading the `active` class back off the
 * rendered `NavLink`, which needed an effect per row and a render to settle.
 *
 * `groupPatterns` is supplied by the caller because `useMatchPattern` may be a
 * hook: it has to be called from the component, once per group, in a stable
 * order.
 */
export const getActiveIds = ({
  items,
  pathname,
  exactMatch,
  groupPatterns,
}: {
  items: NavTreeItem[];
  pathname: string;
  exactMatch: boolean;
  groupPatterns: Record<string, string | PathPattern<string>>;
}): string[] => {
  const active: string[] = [];

  // Deliberately not `matchPath({ path: to, end: exactMatch })`: with `end`
  // off that treats every route as a match for `/`, so a nav whose first item
  // is the dashboard (`path: ''`) shows it selected everywhere. This is
  // `NavLink`'s own rule — a prefix match only on a `/` boundary — so the row's
  // `active` class and its selected styling always agree.
  const matches = (to: string) => {
    const current = pathname.toLowerCase();
    const target = to.toLowerCase().replace(/\/+$/, '') || '/';

    if (current === target) return true;
    if (exactMatch) return false;

    return current.startsWith(target) && current.charAt(target.length) === '/';
  };

  items.forEach((item) => {
    const { to, prefix } = item.meta ?? {};

    if (to && matches(to)) {
      active.push(item.id);
    }

    item.items?.forEach((subItem) => {
      if (subItem.meta?.to && matches(subItem.meta.to)) {
        active.push(subItem.id);
        active.push(item.id);
      }
    });

    // A group with no matching child can still own the route — a details page
    // under `statistics/:id`, say — which is what `useMatchPattern` describes.
    if (prefix !== undefined && !active.includes(item.id)) {
      const pattern = groupPatterns[item.id];
      if (pattern && matchPath(pattern, pathname)) {
        active.push(item.id);
      }
    }
  });

  // A group is pushed once per matching child, and overlapping child paths
  // (`/statistics/balance` and `/statistics/balance/edit`) can both match.
  return Array.from(new Set(active));
};
