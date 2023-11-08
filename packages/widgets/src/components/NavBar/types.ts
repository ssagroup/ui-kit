import { IMapIcons } from '@ssa-ui-kit/core';

export interface INavBarProps {
  items: Array<{ path: string; iconName: keyof IMapIcons }>;
}

export type NavBarExtendedItem = {
  path: string;
  iconName: keyof IMapIcons;
  title: string;
};

export type NavBarExtendedGroup = {
  prefix?: string;
  iconName: keyof IMapIcons;
  title: string;
  items: Array<{ path: string; title: string }>;
};

export interface INavBarExtendedProps {
  items: Array<NavBarExtendedItem | NavBarExtendedGroup>;
}
