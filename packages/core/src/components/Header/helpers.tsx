import Icon from '@components/Icon';

import { HeaderNavItem } from './types';

/** Submenus nest this deep at most: top level → dropdown → flyout. */
export const MAX_DEPTH = 2;

/**
 * Same rule as react-router's `NavLink` without `end`: the path itself or
 * anything below it, matched on whole segments — `/people` covers
 * `/people/42` but not `/peoples`. `/` only matches itself, as with NavLink.
 */
export const isPathActive = (pathname: string, path: string) => {
  if (pathname === path) {
    return true;
  }
  if (path === '/') {
    return false;
  }
  const base = path.endsWith('/') ? path.slice(0, -1) : path;
  return pathname.startsWith(`${base}/`);
};

/** Leaf: its own path. Group: any descendant up to `MAX_DEPTH`. */
export const isItemActive = (
  item: HeaderNavItem,
  pathname: string,
  depth = 0,
): boolean => {
  if (item.children?.length && depth < MAX_DEPTH) {
    return item.children.some((child) =>
      isItemActive(child, pathname, depth + 1),
    );
  }
  return !!item.path && isPathActive(pathname, item.path);
};

export const hasSubmenu = (item: HeaderNavItem, depth: number) =>
  !!item.children?.length && depth < MAX_DEPTH;

export const renderItemIcon = (icon: HeaderNavItem['icon'], size: number) => {
  if (!icon) {
    return null;
  }
  if (typeof icon === 'string') {
    return <Icon name={icon} size={size} color="currentColor" />;
  }
  return icon;
};
