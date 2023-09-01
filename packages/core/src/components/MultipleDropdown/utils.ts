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

export const getActiveItems = <T extends IDropdownOption[]>({
  allItems = [],
  placeholder,
}: {
  allItems: T | [];
  placeholder: string;
}): ReactNode[] =>
  allItems
    .filter((item) => item.isSelected)
    .map((activeItem) => getActiveItem({ activeItem, placeholder }));
