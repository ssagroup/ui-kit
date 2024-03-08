import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { IMapIcons } from '@ssa-ui-kit/core';

export interface INavBarProps {
  items: Array<{ path: string; iconName: keyof IMapIcons }>;
}

export type NavBarExtendedItem = {
  CustomIcon?: () => EmotionJSX.Element;
  path: string;
  iconName: keyof IMapIcons;
  title: string;
  mainAxisOffset?: number;
};

export type NavBarExtendedGroup = {
  CustomIcon?: () => EmotionJSX.Element;
  prefix?: string;
  iconName: keyof IMapIcons;
  title: string;
  items: Array<{ path: string; title: string }>;
  mainAxisOffset?: number;
};

export interface INavBarExtendedProps {
  items: Array<NavBarExtendedItem | NavBarExtendedGroup>;
}
