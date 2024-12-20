import { CSSProperties } from 'react';
import {
  NavBarExtendedGroup,
  NavBarExtendedItem,
  NavBarExtendedSubItem,
} from '../..';

export interface CollapsibleNavBarItem extends NavBarExtendedItem {
  iconSize: number;
  css?: React.CSSProperties;
}

export interface CollapsibleNavBarGroup<
  T extends NavBarExtendedSubItem = NavBarExtendedSubItem,
> extends NavBarExtendedGroup<T> {
  iconSize: number;
  css?: React.CSSProperties;
  prefix: string;
}

export interface CollapsibleNavBarExtendedProps<
  T extends NavBarExtendedSubItem = NavBarExtendedSubItem,
> {
  items: Array<CollapsibleNavBarItem | CollapsibleNavBarGroup<T>>;
  renderLogo: React.ReactElement;
  theme?: 'default' | 'light';
  className?: string;
  subMenuMaxWidth?: CSSProperties['maxWidth'];
  onChange?: (isChecked: boolean) => void;
}
