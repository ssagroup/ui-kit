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
