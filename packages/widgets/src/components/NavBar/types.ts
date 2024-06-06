import { MapIconsType } from '@ssa-ui-kit/core';

export interface NavBarProps {
  items: Array<{ path: string; iconName: keyof MapIconsType }>;
}

export type NavBarExtendedItem = {
  CustomIcon?: () => JSX.Element;
  path: string;
  iconName: keyof MapIconsType;
  title: string;
};

export type NavBarExtendedGroup = {
  CustomIcon?: () => JSX.Element;
  prefix?: string;
  iconName: keyof MapIconsType;
  title: string;
  items: Array<{ path: string; title: string }>;
};

export interface NavBarExtendedProps {
  items: Array<NavBarExtendedItem | NavBarExtendedGroup>;
}
