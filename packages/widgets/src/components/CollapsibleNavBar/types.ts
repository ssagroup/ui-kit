import { NavBarExtendedGroup, NavBarExtendedItem } from '../..';

export interface CollapsibleNavBarItem extends NavBarExtendedItem {
  iconSize: number;
}

export interface CollapsibleNavBarGroup extends NavBarExtendedGroup {
  iconSize: number;
}

export interface CollapsibleNavBarExtendedProps {
  items: Array<CollapsibleNavBarItem | CollapsibleNavBarGroup>;
  renderLogo: React.ReactElement;
}
