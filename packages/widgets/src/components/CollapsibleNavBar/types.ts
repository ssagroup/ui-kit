import { IMapIcons, SVGProps } from '@ssa-ui-kit/core';
import { NavBarExtendedGroup, NavBarExtendedItem } from '../..';

export interface CollapsibleNavBarItem extends NavBarExtendedItem {
  iconSize: number;
  css?: React.CSSProperties;
}

export interface CollapsibleNavBarGroup extends NavBarExtendedGroup {
  iconSize: number;
  css?: React.CSSProperties;
  prefix: string;
}

export interface CollapsibleNavBarExtendedProps {
  items: Array<CollapsibleNavBarItem | CollapsibleNavBarGroup>;
  renderLogo: React.ReactElement;
}

export interface TriggerIconProps {
  iconName?: keyof IMapIcons;
  iconSize?: number;
  className?: string;
  CustomIcon?: (props: Omit<SVGProps, 'fill'>) => JSX.Element;
}
