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
