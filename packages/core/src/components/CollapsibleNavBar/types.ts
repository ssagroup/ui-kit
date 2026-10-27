import { CSSProperties } from 'react';
import { PathPattern } from 'react-router-dom';
import { CSSObject } from '@emotion/react';
// Imported from the module rather than the package root: `'../..'` resolves
// through the built `dist` entry, which widened `iconName` to `string` and put
// it out of step with `keyof MapIconsType` everywhere else in the source tree.
import {
  NavBarExtendedGroup,
  NavBarExtendedItem,
  NavBarExtendedSubItem,
} from '@components/NavBar/types';

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

/**
 * The panel header, above the menu.
 *
 * Every field is optional, which is what covers the design's three variants:
 * headline alone, headline with a large picture above the name, and headline
 * with a small avatar inline beside it. Pass elements rather than urls so the
 * kit's `Avatar` — or anything else — can be dropped straight in.
 */
export interface CollapsibleNavBarHeader {
  /** Headline, shown above everything else. */
  title?: React.ReactNode;
  /** Person's name, shown under the picture or beside the avatar. */
  name?: React.ReactNode;
  /** Small element rendered inline, before the name. Typically an `Avatar`. */
  avatar?: React.ReactNode;
  /** Large square picture above the name, e.g. an `img`. */
  image?: React.ReactNode;
}

export interface CollapsibleNavBarExtendedProps<
  T extends NavBarExtendedSubItem = NavBarExtendedSubItem,
> {
  /** Nav items: link items (path, iconName, iconSize, title) or groups with prefix, iconName, iconSize, title, items (sub-items: path, title). */
  items: Array<CollapsibleNavBarItem | CollapsibleNavBarGroup<T>>;
  /** Logo or branding element (e.g. image or div) shown above the nav. */
  renderLogo?: React.ReactElement;
  /**
   * Header shown above the menu in the expanded panel — headline, picture,
   * avatar, name. Hidden in the collapsed rail, which has no room for it.
   */
  header?: CollapsibleNavBarHeader;
  /** Visual theme: dark (default) or light sidebar. */
  theme?: 'default' | 'light';
  /**
   * Colour of the active row and of the group that owns it. Defaults to the
   * theme's own accent — `blueCool` on the dark sidebar, `primary.dark` on the
   * light one — so an app with its own brand colour can override it without
   * restyling the rows.
   */
  activeColor?: string;
  /** Optional CSS class for the root. */
  className?: string;
  /** Max width for submenu panels (e.g. 220). */
  subMenuMaxWidth?: CSSProperties['maxWidth'];
  /** When true, show tooltips on nav icons when sidebar is collapsed. */
  showIconTooltip?: boolean;
  /**
   * Custom route matching for active state (e.g. for React Router): given a
   * group's `prefix`, return the pattern that marks the group active.
   *
   * Must be a plain function — it is called once per group from a loop, so a
   * hook inside it would change its call order whenever the menu gains or
   * loses a group.
   */
  useMatchPattern?: (prefix: string) => string | PathPattern<string>;
  /**
   * Called when the sidebar expand/collapse state changes — on user toggles,
   * the collapse on viewport resize, and the mobile overlay closing on
   * navigation.
   *
   * Uncontrolled, it also fires once on mount with the initial state.
   * Controlled (`isOpen` passed), it never fires on mount and only reports a
   * value that differs from `isOpen`.
   */
  onChange?: (isChecked: boolean) => void;
  /**
   * Called when the user opens or closes the panel with its toggle. Unlike
   * `onChange`, it does not fire on mount, on the resize collapse, on mobile
   * navigation, or when `isOpen` changes from outside.
   */
  onToggle?: (isOpen: boolean) => void;
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
  /**
   * Controlled expanded state. When passed, the sidebar renders from it and
   * keeps no state of its own; toggles are reported through `onChange` for the
   * caller to apply. Omit it for the uncontrolled `defaultExpanded` behaviour.
   *
   * The bar still asks to collapse (`onChange(false)`) when the viewport
   * resizes, as it does uncontrolled.
   */
  isOpen?: boolean;
}
