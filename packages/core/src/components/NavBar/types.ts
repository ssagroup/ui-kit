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

export type NavBarExtendedGroup = {
  CustomIcon?: () => EmotionJSX.Element;
  prefix?: string;
  iconName: keyof MapIconsType;
  title: string;
  items: Array<{ path: string; title: string }>;
};

export interface NavBarExtendedProps {
  items: Array<NavBarExtendedItem | NavBarExtendedGroup>;
}
