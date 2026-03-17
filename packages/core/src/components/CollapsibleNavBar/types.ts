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
  /** Nav items: link items (path, iconName, iconSize, title) or groups with prefix, iconName, iconSize, title, items (sub-items: path, title). */
  items: Array<CollapsibleNavBarItem | CollapsibleNavBarGroup<T>>;
  /** Logo or branding element (e.g. image or div) shown above the nav. */
  renderLogo: React.ReactElement;
  /** Visual theme: dark (default) or light sidebar. */
  theme?: 'default' | 'light';
  /** Optional CSS class for the root. */
  className?: string;
  /** Max width for submenu panels (e.g. 220). */
  subMenuMaxWidth?: CSSProperties['maxWidth'];
  /** When true, show tooltips on nav icons when sidebar is collapsed. */
  showIconTooltip?: boolean;
  /** Custom route matching for active state (e.g. for React Router). */
  useMatchPattern?: (prefix: string) => string | PathPattern<string>;
  /** Called when the sidebar expand/collapse state changes. */
  onChange?: (isChecked: boolean) => void;
  /**
   * If true, only exact path matches will be considered active.
   * If false, sub-routes will also be considered active.
   * @default false
   */
  exactMatch?: boolean;
  /**
   * Initial expanded state (sidebar shows icon + text). When false, only icons are shown until the user toggles.
   * @default false
   */
  defaultExpanded?: boolean;
}
