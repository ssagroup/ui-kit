import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { MapIconsType } from '@components/Icon/types';

export interface NavBarProps {
  items: Array<{ path: string; iconName: keyof MapIconsType }>;
}

export type NavBarExtendedItem = {
  CustomIcon?: () => EmotionJSX.Element;
  path: string;
  iconName: keyof MapIconsType;
  title: string;
};

export type NavBarExtendedSubItem<T extends object = object> = {
  path: string;
  title: string;
} & T;

export interface NavBarExtendedGroup<
  T extends NavBarExtendedSubItem = NavBarExtendedSubItem,
> {
  CustomIcon?: () => EmotionJSX.Element;
  prefix?: string;
  iconName: keyof MapIconsType;
  title: string;
  items: Array<T>;
}

export interface NavBarExtendedProps<
  T extends NavBarExtendedSubItem = NavBarExtendedSubItem,
> {
  items: Array<NavBarExtendedItem | T>;
}
