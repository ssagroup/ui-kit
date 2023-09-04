import { ReactNode } from 'react';
import { IDropdownOption } from '../..';

const getActiveItem = ({ activeItem, placeholder }): ReactNode =>
  activeItem
    ? activeItem.label ||
      activeItem.children ||
      activeItem.value ||
      activeItem ||
      placeholder
    : placeholder;

export const getActiveItems = <
  T extends Record<string | number, IDropdownOption>,
>({
  allItems = {} as T,
  placeholder,
}: {
  allItems: T;
  placeholder: string;
}): ReactNode[] => {
  const allItemsArray = Object.values(allItems);
  return allItemsArray
    .filter((item) => item.isSelected)
    .map((activeItem) => getActiveItem({ activeItem, placeholder }));
};
