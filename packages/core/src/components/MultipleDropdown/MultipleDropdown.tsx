import React, { useState, useEffect, useId, useRef } from 'react';
import styled from '@emotion/styled';
import { useClickOutside } from '@ssa-ui-kit/hooks';
import { mapObjIndexed } from '@ssa-ui-kit/utils';
import { useMergeRefs } from '@floating-ui/react';

import DropdownBase from '@components/DropdownBase';
import DropdownToggle from '@components/DropdownToggle';
import DropdownArrow from '@components/DropdownArrow';
import MultipleDropdownOptions from '@components/MultipleDropdownOptions';
import {
  OptionValue,
  toDropdownMenuItems,
} from '@components/DropdownOptions/utils';
import { useToggleListKeys } from '@components/DropdownOptions/useToggleListKeys';
import { getNextActiveValue } from '@components/ContextMenu';
import MultipleDropdownContext from '@components/MultipleDropdown/MultipleDropdown.context';
import { DropdownOptionProps } from '@components/DropdownOptions/types';
import { resolveDisabled } from '@utils/deprecation';

import { DropdownContextType, DropdownProps } from './types';
import { getActiveItems } from '@components/MultipleDropdown/utils';
import MultipleDropdownNotification from '@components/MultipleDropdownNotification';

const DropdownPlaceholderLabel = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function MultipleDropdownInner<T extends DropdownOptionProps>(
  {
    selectedItems = [],
    disabled,
    isDisabled,
    isOpen: isInitOpen,
    isMultiple = true,
    placeholder = 'Select something',
    showPlaceholder = true,
    label,
    children,
    onChange: handleChange,
    className,
    maxHeight = 200,
    width,
  }: DropdownProps<T>,
  ref?: React.ForwardedRef<HTMLDivElement | null>,
) {
  const isDropdownDisabled = resolveDisabled(
    'MultipleDropdown',
    disabled,
    isDisabled,
  );
  const dropdownBaseRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const dropdownId = useId();
  // `width` has no default — without it the base and the toggle both
  // shrink-wrap, which is the historical behaviour. When set it has to clear
  // the base's `min-width` and the multiple toggle's `max-width`, otherwise
  // those caps silently win over the explicit value.
  //
  // Only the outer base gets the requested value; the toggle gets 100%.
  // Repeating the value would compound relative units: `width="60%"` would
  // otherwise render the toggle at 60% of an already-60% base.
  //
  // Spread rather than passed as `css={...}`: Emotion wraps an element whenever
  // `css` is present in its props, even when its value is undefined, and that
  // re-serializes any incoming `className` (e.g. from
  // `styled(MultipleDropdown)`). Omitting the key keeps the no-width path
  // identical to writing no `css` prop.
  const baseCssProps =
    width === undefined ? undefined : { css: { width, minWidth: 0 } };
  const toggleCssProps =
    width === undefined
      ? undefined
      : { css: { width: '100%', maxWidth: 'none' } };
  const [isOpen, setIsOpen] = useState(isInitOpen || false);
  const [optionsWithKey, setOptionsWithKey] = useState<
    Record<number | string, T>
  >({});
  // Highlighted option. Focus stays on the toggle (the combobox), which
  // drives the list and points at the option with aria-activedescendant.
  const [activeValue, setActiveValue] = useState<OptionValue | null>(null);
  const listId = `dropdown-popup-${dropdownId}`;
  const [values, setValues] = useState<Array<unknown>>([]);
  const [valuesWithoutPlaceholder, setValuesWithoutPlaceholder] = useState<
    Array<unknown>
  >([]);

  const memoSelectedItems = React.useMemo(
    () => selectedItems,
    [JSON.stringify(selectedItems)],
  );

  const childrenArray = React.Children.toArray(children).filter(Boolean);
  const menuItems = toDropdownMenuItems(childrenArray);

  const close = () => {
    setIsOpen(false);
    setActiveValue(null);
  };

  /** Opens with the first selected option highlighted, else per the key pressed. */
  const open = (key = 'ArrowDown') => {
    setIsOpen(true);
    const selected = menuItems.find(
      (item) => !item.disabled && optionsWithKey[item.value]?.isSelected,
    );
    setActiveValue(
      selected?.value ?? getNextActiveValue(menuItems, null, key) ?? null,
    );
  };

  const onChange = (item: DropdownOptionProps) => {
    if (isDropdownDisabled || !item) {
      return;
    }
    if (!isMultiple && optionsWithKey[item.value].isSelected) {
      close();
      return;
    }
    let newOptionsWithKey = {};
    let isSelected = true;
    if (isMultiple) {
      isSelected = !optionsWithKey[item.value].isSelected;
      newOptionsWithKey = {
        ...optionsWithKey,
        [item.value]: {
          ...optionsWithKey[item.value],
          isSelected,
        },
      };
      setOptionsWithKey(newOptionsWithKey);
    } else {
      newOptionsWithKey = mapObjIndexed(
        (option) => ({
          ...option,
          isSelected: option.value === item.value,
        }),
        optionsWithKey,
      );
      setOptionsWithKey(newOptionsWithKey);
      close();
    }

    if (handleChange) {
      handleChange(item.value, isSelected);
    }
  };

  useClickOutside(dropdownBaseRef, () => isOpen && close());

  useEffect(() => {
    if (isDropdownDisabled && isOpen) {
      close();
    }
  }, [isDropdownDisabled]);

  useEffect(() => {
    const keyedOptions: Record<number | string, T> = {};
    (childrenArray as React.ReactElement<T>[]).forEach((child) => {
      keyedOptions[child.props.value] = {
        ...child.props,
        isSelected: !!memoSelectedItems.find(
          (selectedItem) => selectedItem.value === child.props.value,
        ),
      };
    });

    setOptionsWithKey(keyedOptions);
  }, [memoSelectedItems, children]);

  const toggleKeys = useToggleListKeys({
    listId,
    isOpen,
    disabled: isDropdownDisabled,
    menuItems,
    activeValue,
    setActiveValue,
    open,
    close,
    // Toggles the option; the list stays open in multi-select mode.
    onPick: (value) => onChange(optionsWithKey[value]),
  });

  const contextValue: DropdownContextType<DropdownOptionProps> = React.useMemo(
    () => ({
      onChange,
      allItems: optionsWithKey,
      isMultiple,
      maxHeight,
      activeValue,
      setActiveValue,
    }),
    [onChange, optionsWithKey, isMultiple, maxHeight, activeValue],
  );

  useEffect(() => {
    const newValues = getActiveItems({ allItems: optionsWithKey, placeholder });
    const newValuesWithoutPlaceholder = newValues.filter(
      (item) => item !== placeholder,
    );
    setValues(newValues);
    setValuesWithoutPlaceholder(newValuesWithoutPlaceholder);
  }, [optionsWithKey]);

  return (
    <MultipleDropdownContext.Provider value={contextValue}>
      <DropdownBase
        {...baseCssProps}
        ref={useMergeRefs([dropdownBaseRef, ref])}
        data-testid="dropdown">
        <DropdownToggle
          {...toggleCssProps}
          className={className}
          isOpen={isOpen}
          disabled={isDropdownDisabled}
          onClick={() => (isOpen ? close() : open())}
          {...toggleKeys}
          aria-labelledby={`dropdown-label-${dropdownId}`}
          aria-controls={listId}
          isMultiple={isMultiple}
          selectedCount={valuesWithoutPlaceholder.length}>
          {isMultiple ? (
            <>
              <DropdownPlaceholderLabel>
                {label}
                {showPlaceholder
                  ? values.length > 0 && `: ${values[0]}`
                  : valuesWithoutPlaceholder.length > 0 &&
                    `: ${valuesWithoutPlaceholder[0]}`}
              </DropdownPlaceholderLabel>
              {values.length > 1 ? (
                <MultipleDropdownNotification as={'div'}>
                  +{values.length - 1}
                </MultipleDropdownNotification>
              ) : (
                ''
              )}
            </>
          ) : (
            values.join('')
          )}
          <DropdownArrow isUp={isOpen} />
        </DropdownToggle>

        {isOpen ? (
          <MultipleDropdownOptions id={listId}>
            {childrenArray}
          </MultipleDropdownOptions>
        ) : null}
      </DropdownBase>
    </MultipleDropdownContext.Provider>
  );
}

/**
 * MultipleDropdown - Dropdown component for multi-select and single-select
 *
 * A flexible dropdown that lets users select one or more options from a list.
 * In multi-select mode (`isMultiple=true`, default) each option toggles independently;
 * the toggle button shows the first selected value and a `+N` badge for overflow.
 * In single-select mode (`isMultiple=false`) selecting an option closes the menu.
 * Forwards its ref to the root container div.
 *
 * Component structure:
 * - MultipleDropdown (root container with context)
 *   - DropdownToggle (button that opens/closes the menu)
 *   - MultipleDropdownOptions (menu container rendered when open)
 *     - DropdownOption (individual selectable items)
 *
 * @category Form Controls
 * @subcategory Selection
 *
 * @example
 * ```tsx
 * // Basic multi-select
 * <MultipleDropdown
 *   label="Fruits"
 *   selectedItems={[{ value: 'apple' }]}
 *   onChange={(value, isSelected) => handleChange(value, isSelected)}
 * >
 *   <DropdownOption value="apple">Apple</DropdownOption>
 *   <DropdownOption value="banana">Banana</DropdownOption>
 *   <DropdownOption value="cherry">Cherry</DropdownOption>
 * </MultipleDropdown>
 * ```
 *
 * @example
 * ```tsx
 * // Single-select mode (closes on pick)
 * <MultipleDropdown
 *   label="Country"
 *   isMultiple={false}
 *   selectedItems={selected}
 *   onChange={handleChange}
 * >
 *   <DropdownOption value="us">United States</DropdownOption>
 *   <DropdownOption value="uk">United Kingdom</DropdownOption>
 * </MultipleDropdown>
 * ```
 *
 * @example
 * ```tsx
 * // Hide placeholder text, only show badge count
 * <MultipleDropdown
 *   label="Tags"
 *   showPlaceholder={false}
 *   selectedItems={tags}
 *   onChange={handleChange}
 * >
 *   {tags.map(tag => (
 *     <DropdownOption key={tag.value} value={tag.value}>{tag.label}</DropdownOption>
 *   ))}
 * </MultipleDropdown>
 * ```
 *
 * @see {@link DropdownOption} - Child component for individual options
 * @see {@link DropdownToggle} - Toggle button component
 * @see {@link MultipleDropdownOptions} - Options menu container
 *
 * @accessibility
 * - ARIA attributes set according to WAI-ARIA combobox pattern
 * - Focus stays on the toggle, which points at the highlighted option with
 *   `aria-activedescendant`
 * - Arrow keys, Home and End move the highlight; Enter or Space toggles it
 *   (picks and closes in single-select mode); Escape and Tab close
 * - Click outside to close
 * - Screen reader friendly with aria-expanded and aria-controls
 *
 * @see https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html
 */
const MultipleDropdown = React.forwardRef<
  HTMLDivElement,
  DropdownProps<DropdownOptionProps>
>(MultipleDropdownInner);

export default MultipleDropdown;
