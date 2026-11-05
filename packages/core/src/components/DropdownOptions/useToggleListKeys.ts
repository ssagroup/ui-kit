import { KeyboardEvent, useRef } from 'react';

import {
  ContextMenuEntry,
  getContextMenuOptionId,
  getNextActiveValue,
} from '@components/ContextMenu';
import { flattenItems } from '@components/ContextMenu/utils';

import { OptionValue } from './utils';

/** Options of {@link useToggleListKeys}. */
export interface UseToggleListKeysOptions<
  E extends HTMLElement = HTMLButtonElement,
> {
  /** Id of the ContextMenu the toggle controls. */
  listId: string;
  isOpen: boolean;
  disabled?: boolean;
  menuItems: ContextMenuEntry<OptionValue>[];
  /** Highlighted option. */
  activeValue: OptionValue | null;
  setActiveValue: (value: OptionValue | null) => void;
  /** Opens the list; `key` is the arrow that opened it. */
  open: (key: string) => void;
  close: () => void;
  /** Enter or Space on the highlighted option. */
  onPick: (value: OptionValue) => void;
  /**
   * Keys go to a text input (the search box): Space types a space and
   * Home / End move the caret instead of the highlight.
   */
  typing?: boolean;
  /** Consumer handlers, run first; `preventDefault()` skips the built-in keys. */
  onKeyDown?: (event: KeyboardEvent<E>) => void;
  onKeyUp?: (event: KeyboardEvent<E>) => void;
}

/**
 * Keyboard for a dropdown toggle that keeps focus while it drives its list:
 * arrows open it, then Arrow/Home/End move the highlight, Enter/Space pick,
 * Escape/Tab close. Returns the toggle's handlers and its
 * `aria-activedescendant`. With `typing`, drives the list from a search input
 * instead.
 */
export const useToggleListKeys = <E extends HTMLElement = HTMLButtonElement>({
  listId,
  isOpen,
  disabled,
  menuItems,
  activeValue,
  setActiveValue,
  open,
  close,
  onPick,
  typing = false,
  onKeyDown,
  onKeyUp,
}: UseToggleListKeysOptions<E>) => {
  // Set when keydown already acted on Space, so the click the browser fires
  // on keyup does not toggle the list straight back.
  const spaceHandled = useRef(false);
  // The highlight can outlive its option when the list changes while open.
  const isActiveListed =
    activeValue !== null &&
    flattenItems(menuItems).some((item) => item.value === activeValue);

  const handleKeyDown = (event: KeyboardEvent<E>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled) return;

    if (!isOpen) {
      // Enter and Space open through the button's own click.
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        open(event.key);
      }
      return;
    }

    if (
      typing &&
      (event.key === ' ' || event.key === 'Home' || event.key === 'End')
    )
      return;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Home':
      case 'End': {
        event.preventDefault();
        const next = getNextActiveValue(menuItems, activeValue, event.key);
        if (next != null) setActiveValue(next);
        break;
      }
      case 'Enter':
      case ' ':
        // Cancels the button click Enter fires on keydown; Space's is
        // cancelled on keyup.
        event.preventDefault();
        spaceHandled.current = event.key === ' ';
        if (isActiveListed) onPick(activeValue as OptionValue);
        // With nothing to pick (e.g. no search matches) the search box keeps
        // the list and the typed text.
        else if (!typing) close();
        break;
      case 'Escape':
        event.preventDefault();
        close();
        break;
      case 'Tab':
        close();
        break;
    }
  };

  const handleKeyUp = (event: KeyboardEvent<E>) => {
    onKeyUp?.(event);
    if (event.key === ' ' && spaceHandled.current) {
      spaceHandled.current = false;
      event.preventDefault();
    }
  };

  const activeDescendant =
    isOpen && isActiveListed
      ? getContextMenuOptionId(listId, activeValue as OptionValue)
      : undefined;

  return {
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    'aria-activedescendant': activeDescendant,
  };
};
