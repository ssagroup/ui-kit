import { IMapIcons } from '@ssa-ui-kit/core';

export interface INavBarProps {
  items: Array<{ path: string; iconName: keyof IMapIcons }>;
}

type NavBarExtendedItem = {
  path: string;
  iconName: keyof IMapIcons;
  title: string;
};

type NavBarExtendedGroup = {
  prefix?: string;
  iconName: keyof IMapIcons;
  title: string;
  items: Array<{ path: string; title: string }>;
};

export interface INavBarExtendedProps {
  items: Array<NavBarExtendedItem | NavBarExtendedGroup>;
}
