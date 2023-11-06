import { IMapIcons } from '@ssa-ui-kit/core';

export type CollapsibleNavBarItem = {
  path: string;
  iconName: keyof IMapIcons;
  iconSize: number;
  title: string;
};

export type CollapsibleNavBarGroup = {
  prefix?: string;
  iconName: keyof IMapIcons;
  iconSize: number;
  title: string;
  items: Array<{ path: string; title: string }>;
};

export interface INavBarExtendedProps {
  items: Array<CollapsibleNavBarItem | CollapsibleNavBarGroup>;
}
