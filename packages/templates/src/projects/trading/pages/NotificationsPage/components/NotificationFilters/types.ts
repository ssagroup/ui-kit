import type { ButtonGroupProps } from '@ssa-ui-kit/core';
import { ALL_FILTER_ID, UNREAD_FILTER_ID } from './consts';

export type FilterProps = {
  text: string;
  isDisabled: boolean;
  isShown: boolean;
};

export type NotificationFiltersProps = {
  allFilter: FilterProps;
  unreadFilter: FilterProps;
  selectedItemId?: typeof ALL_FILTER_ID | typeof UNREAD_FILTER_ID;
} & Pick<ButtonGroupProps, 'onClick' | 'selectedItem'>;
