import { CSSProperties } from 'react';
import { PathPattern } from 'react-router-dom';
import { CSSObject } from '@emotion/react';
import {
  NavBarExtendedGroup,
  NavBarExtendedItem,
  NavBarExtendedSubItem,
} from '../..';

export interface CollapsibleNavBarItem extends NavBarExtendedItem {
  iconSize: number;
  css?: CSSObject;
}

export interface CollapsibleNavBarGroup<
  T extends NavBarExtendedSubItem = NavBarExtendedSubItem,
> extends NavBarExtendedGroup<T> {
  iconSize: number;
  css?: CSSObject;
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
  showIconTooltip?: boolean;
  useMatchPattern?: (prefix: string) => string | PathPattern<string>;
  onChange?: (isChecked: boolean) => void;
}
