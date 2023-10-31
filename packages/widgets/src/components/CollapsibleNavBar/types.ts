import { IMapIcons } from '@ssa-ui-kit/core';

type CollapsibleNavBarItem = {
  path: string;
  iconName: keyof IMapIcons;
  title: string;
};

type CollapsibleNavBarGroup = {
  prefix?: string;
  iconName: keyof IMapIcons;
  title: string;
  items: Array<{ path: string; title: string }>;
};

export interface INavBarExtendedProps {
  items: Array<CollapsibleNavBarItem | CollapsibleNavBarGroup>;
}
