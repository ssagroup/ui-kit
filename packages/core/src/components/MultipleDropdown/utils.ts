import { DropdownOptionProps } from '../..';

const getActiveItem = <T>({
  activeItem,
  placeholder,
}: {
  activeItem: Record<number | string, T>;
  placeholder: string;
}) =>
  activeItem
    ? activeItem.label ||
      activeItem.children ||
      activeItem.value ||
      activeItem ||
      placeholder
    : placeholder;

interface GetActiveItems<T> {
  allItems: T;
  placeholder: string;
}
export const getActiveItems = <
  T extends Record<string | number, DropdownOptionProps>,
>({
  allItems = {} as T,
  placeholder,
}: GetActiveItems<T>) => {
  const activeItems = Object.values(allItems)
    .filter((item) => item.isSelected)
    .map((activeItem) => getActiveItem({ activeItem, placeholder }));
  return activeItems.length ? activeItems : [placeholder];
};

/**
 * Room the +N badge takes in the toggle: its fixed 18px circle plus the
 * toggle's 8px gap.
 */
export const BADGE_SPACE = 26;

/**
 * How many values, taken in order, fit into `available` pixels. Room for the
 * badge is reserved whenever at least one value is left out; when every value
 * fits there is no badge, so the reserve is not needed.
 */
export const getFitCount = (
  widths: number[],
  available: number,
  badgeSpace: number,
) => {
  // Sub-pixel slack so fractional widths do not drop a value that fits.
  const room = available + 0.5;
  const total = widths.reduce((sum, width) => sum + width, 0);
  if (total <= room) {
    return widths.length;
  }
  let used = badgeSpace;
  let count = 0;
  for (const width of widths) {
    if (used + width > room) {
      break;
    }
    used += width;
    count++;
  }
  return count;
};
