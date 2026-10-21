import { KeyboardEvent, useRef } from 'react';

import {
  ContextMenuItem,
  getContextMenuOptionId,
  getNextActiveValue,
} from '@components/ContextMenu';

import { OptionValue } from './utils';

/** Options of {@link useToggleListKeys}. */
export interface UseToggleListKeysOptions {
  /** Id of the ContextMenu the toggle controls. */
  listId: string;
  isOpen: boolean;
  disabled?: boolean;
  menuItems: ContextMenuItem<OptionValue>[];
  /** Highlighted option. */
  activeValue: OptionValue | null;
  setActiveValue: (value: OptionValue | null) => void;
  /** Opens the list; `key` is the arrow that opened it. */
  open: (key: string) => void;
  close: () => void;
  /** Enter or Space on the highlighted option. */
  onPick: (value: OptionValue) => void;
  /** Consumer handlers, run first; `preventDefault()` skips the built-in keys. */
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

/**
 * Keyboard for a dropdown toggle that keeps focus while it drives its list:
 * arrows open it, then Arrow/Home/End move the highlight, Enter/Space pick,
 * Escape/Tab close. Returns the toggle's handlers and its
 * `aria-activedescendant`.
 */
export const useToggleListKeys = ({
  listId,
  isOpen,
  disabled,
  menuItems,
  activeValue,
  setActiveValue,
  open,
  close,
  onPick,
  onKeyDown,
  onKeyUp,
}: UseToggleListKeysOptions) => {
  // Set when keydown already acted on Space, so the click the browser fires
  // on keyup does not toggle the list straight back.
  const spaceHandled = useRef(false);
  // The highlight can outlive its option when the list changes while open.
  const isActiveListed =
    activeValue !== null &&
    menuItems.some((item) => item.value === activeValue);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
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
        else close();
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

  const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
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
