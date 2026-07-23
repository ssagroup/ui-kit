import { BreadcrumbItem } from './types';

/** A rendered slot in the trail: either a real crumb or the collapsed `…`. */
export type BreadcrumbEntry =
  | { type: 'item'; item: BreadcrumbItem; index: number }
  | { type: 'ellipsis'; items: BreadcrumbItem[] };

/**
 * Collapse the trail to `first … last` when it exceeds `maxItems`, per design.
 * The hidden middle crumbs are returned on the ellipsis entry so they can be
 * offered from its menu. When `maxItems` is falsy or not exceeded, every item
 * is returned as-is.
 */
export const collapseItems = (
  items: BreadcrumbItem[],
  maxItems?: number,
): BreadcrumbEntry[] => {
  if (!maxItems || items.length <= maxItems || items.length <= 2) {
    return items.map((item, index) => ({ type: 'item', item, index }));
  }

  const lastIndex = items.length - 1;

  return [
    { type: 'item', item: items[0], index: 0 },
    { type: 'ellipsis', items: items.slice(1, lastIndex) },
    { type: 'item', item: items[lastIndex], index: lastIndex },
  ];
};
