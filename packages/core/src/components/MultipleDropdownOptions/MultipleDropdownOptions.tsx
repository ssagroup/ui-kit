import { MouseEvent } from 'react';
import { css } from '@emotion/react';

import { ContextMenu } from '@components/ContextMenu';
import { useMultipleDropdownContext } from '@components/MultipleDropdown/MultipleDropdown.context';
import {
  OptionValue,
  toDropdownMenuItems,
} from '@components/DropdownOptions/utils';
import { resolveAriaProp } from '@utils/deprecation';

import { DropdownItemsListProps } from './types';

// Focus stays on the toggle while the list is used with the pointer.
const keepToggleFocus = (event: MouseEvent) => event.preventDefault();

// Positioned against the MultipleDropdown base, under the toggle.
const listPosition = css`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin: 4px 0 0;
  z-index: 1;
`;

/**
 * MultipleDropdownOptions - Options menu container for MultipleDropdown
 *
 * Renders the `DropdownOption` children as a `ContextMenu` under the
 * MultipleDropdown toggle: a checkbox per row in multi-select mode, a check
 * mark on the selected row otherwise. Focus stays on the toggle; the
 * highlighted option is driven from there and announced through
 * `aria-activedescendant`.
 *
 * @category Form Controls
 * @subcategory Selection
 *
 * @example
 * ```tsx
 * // Rendered by MultipleDropdown from its DropdownOption children
 * <MultipleDropdown label="Fruits" onChange={handleChange}>
 *   <DropdownOption value="apple">Apple</DropdownOption>
 *   <DropdownOption value="banana">Banana</DropdownOption>
 * </MultipleDropdown>
 * ```
 *
 * @see {@link MultipleDropdown} - Parent component
 *
 * @accessibility
 * - Uses role="listbox" (multi-selectable in multi-select mode) with role="option" rows
 * - Arrow keys, Home, End, Enter, Space and Escape on the toggle
 */
const MultipleDropdownOptions = ({
  'aria-labelledby': ariaLabelledbyNative,
  ariaLabelledby,
  id,
  children,
}: DropdownItemsListProps) => {
  const {
    onChange,
    allItems,
    isMultiple,
    maxHeight,
    activeValue = null,
    setActiveValue,
  } = useMultipleDropdownContext();
  const labelledby = resolveAriaProp(
    'MultipleDropdownOptions',
    'aria-labelledby',
    ariaLabelledbyNative,
    ariaLabelledby,
  );

  const selected = Object.values(allItems)
    .filter((item) => item.isSelected)
    .map((item) => item.value as OptionValue);
  const commonProps = {
    id,
    'aria-labelledby': labelledby,
    css: listPosition,
    items: toDropdownMenuItems(children),
    onAction: (value: OptionValue) => onChange(allItems[value]),
    activeValue,
    onActiveValueChange: setActiveValue,
    maxHeight,
    tabIndex: -1,
    onMouseDown: keepToggleFocus,
  };

  return isMultiple ? (
    <ContextMenu<OptionValue>
      {...commonProps}
      selectionMode="multiple"
      value={selected}
    />
  ) : (
    <ContextMenu<OptionValue>
      {...commonProps}
      selectionMode="single"
      value={selected[0] ?? null}
    />
  );
};

export default MultipleDropdownOptions;
