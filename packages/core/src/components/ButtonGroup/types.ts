import { ReactNode } from 'react';
import { SerializedStyles } from '@emotion/react';

export type ButtonGroupItem = {
  id: string | number;
  text: string;
  /** Renders this item's button as disabled. */
  disabled?: boolean;
  /**
   * @deprecated Use `disabled` instead. Removed in the next major release.
   */
  isDisabled?: boolean;
};

/**
 * A selection, expressed either as the item itself or — usually more
 * convenient — as just its `id`. The group only ever compares ids, so the two
 * forms are equivalent.
 */
export type ButtonGroupValue = ButtonGroupItem | ButtonGroupItem['id'];

export interface ButtonGroupProps {
  /**
   * Buttons to render, as `ButtonGroupButton` children. When provided, `items`
   * is ignored — use this when a button needs an icon, custom markup, or
   * anything else `ButtonGroupItem` cannot express.
   *
   * Note that an uncontrolled group in children mode starts with **nothing**
   * selected; pass `defaultValue` to preselect. (The `items` API preselects the
   * first item, which it can only do because it can see the list.)
   */
  children?: ReactNode;

  /**
   * Buttons to render, as data. Ignored when `children` are provided.
   */
  items?: Array<ButtonGroupItem>;

  /**
   * Active selection, for the controlled pattern. When provided, the parent
   * owns the selection and the group only reports intent through `onClick`.
   *
   * Pass the item's `id` (recommended) or the whole item:
   * `value="unread"` or `value={{ id: 'unread', text: 'Unread' }}`.
   */
  value?: ButtonGroupValue;

  /**
   * Initial selection, as an `id` or the whole item. Only used when neither
   * `value` nor the deprecated `selectedItem` / `externalState` are provided;
   * otherwise the group falls back to the first item.
   */
  defaultValue?: ButtonGroupValue;

  /**
   * Also accepts a bare `id`, like `value`.
   *
   * @deprecated Use `value` for the controlled pattern, or `defaultValue` for
   * the initial selection. Removed in the next major release.
   */
  selectedItem?: ButtonGroupValue;

  /**
   * Also accepts a bare `id`, like `value`.
   *
   * @deprecated Use `value` instead. Removed in the next major release.
   * Note the semantics differ slightly: `externalState` is synced *into*
   * internal state, so the group still moves on click even when the parent
   * ignores `onClick`. `value` is fully controlled.
   */
  externalState?: ButtonGroupValue;

  /**
   * Called with the clicked item. Optional — an uncontrolled group that only
   * needs to track its own selection needs no handler.
   *
   * In children mode the group cannot see an item list, so it reports
   * `{ id, text, disabled }` assembled from the clicked `ButtonGroupButton`'s
   * props — `id` is always accurate, `text` is only populated when the button's
   * content is a plain string or its `text` prop is set. Prefer reading `id`,
   * or give each button its own `onClick`.
   */
  onClick?: (item: ButtonGroupItem) => void;
  buttonStyles?: SerializedStyles;
}

export interface ButtonGroupButtonProps {
  /** Identifies this button within the group; matched against `value`. */
  id: ButtonGroupItem['id'];

  /** Button content — text, an icon, or any markup. */
  children?: ReactNode;

  /**
   * Plain-text label for this button, used when the group reports the clicked
   * item through its `onClick`. Only needed when `children` is not a string.
   */
  text?: string;

  /** Renders this button as disabled. */
  disabled?: boolean;

  /**
   * Fired when this button is clicked, in addition to the group's `onClick`.
   * The idiomatic handler in children mode.
   */
  onClick?: () => void;

  /** Custom CSS class name, merged with the group's active-state class. */
  className?: string;
}

export interface ButtonGroupContextValue {
  activeId?: ButtonGroupItem['id'];
  onSelect: (item: ButtonGroupItem) => void;
  buttonStyles?: SerializedStyles;
}
