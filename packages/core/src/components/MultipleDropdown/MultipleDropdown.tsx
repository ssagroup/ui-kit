import React, { useState, useEffect, useId, useRef } from 'react';
import styled from '@emotion/styled';
import { useClickOutside } from '@ssa-ui-kit/hooks';
import { mapObjIndexed } from '@ssa-ui-kit/utils';
import { useMergeRefs } from '@floating-ui/react';

import DropdownBase from '@components/DropdownBase';
import DropdownToggle from '@components/DropdownToggle';
import DropdownArrow from '@components/DropdownArrow';
import MultipleDropdownOptions from '@components/MultipleDropdownOptions';
import MultipleDropdownContext from '@components/MultipleDropdown/MultipleDropdown.context';
import { DropdownOptionProps } from '@components/DropdownOptions/types';

import { DropdownContextType, DropdownProps } from './types';
import { getActiveItems } from '@components/MultipleDropdown/utils';
import MultipleDropdownNotification from '@components/MultipleDropdownNotification';

const DropdownPlaceholderLabel = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

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
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Click outside to close
 * - Screen reader friendly with aria-expanded and aria-controls
 *
 * @see https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html
 */
function MultipleDropdownInner<T extends DropdownOptionProps>(
  {
    selectedItems = [],
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
  }: DropdownProps<T>,
  ref?: React.ForwardedRef<HTMLDivElement | null>,
) {
  const dropdownBaseRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const dropdownId = useId();
  const [isOpen, setIsOpen] = useState(isInitOpen || false);
  const [optionsWithKey, setOptionsWithKey] = useState<
    Record<number | string, T>
  >({});
  const [items, setItems] = useState<Array<React.ReactElement>>([]);
  const [values, setValues] = useState<Array<unknown>>([]);
  const [valuesWithoutPlaceholder, setValuesWithoutPlaceholder] = useState<
    Array<unknown>
  >([]);

  const memoSelectedItems = React.useMemo(
    () => selectedItems,
    [JSON.stringify(selectedItems)],
  );

  const onChange = (item: DropdownOptionProps) => {
    if (isDisabled || !item) {
      return;
    }
    if (!isMultiple && optionsWithKey[item.value].isSelected) {
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
      setIsOpen(false);
    }

    if (handleChange) {
      handleChange(item.value, isSelected);
    }
  };

  useClickOutside(dropdownBaseRef, () => isOpen && setIsOpen(false));

  useEffect(() => {
    if (isDisabled && isOpen) {
      setIsOpen(false);
    }
  }, [isDisabled]);

  useEffect(() => {
    const childrenArray = React.Children.toArray(children).filter(Boolean);
    const newOptions: T[] = [];
    const keyedOptions: Record<number | string, T> = {};
    const childItems = (childrenArray as React.ReactElement<T>[]).map(
      (child, index) => {
        const newOption = {
          ...child.props,
          isSelected: !!memoSelectedItems.find(
            (selectedItem) => selectedItem.value === child.props.value,
          ),
        };
        newOptions.push(newOption);
        keyedOptions[newOption.value] = newOption;

        return React.cloneElement(child, {
          index,
          onClick: onChange.bind(null),
          ...child.props,
        });
      },
    );

    setOptionsWithKey(keyedOptions);
    setItems(childItems);
  }, [memoSelectedItems, children]);

  const contextValue: DropdownContextType<DropdownOptionProps> = React.useMemo(
    () => ({
      onChange,
      allItems: optionsWithKey,
      isMultiple,
      maxHeight,
    }),
    [onChange, optionsWithKey, isMultiple, maxHeight],
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
        ref={useMergeRefs([dropdownBaseRef, ref])}
        data-testid="dropdown">
        <DropdownToggle
          className={className}
          isOpen={isOpen}
          disabled={isDisabled}
          onClick={setIsOpen.bind(null, !isOpen)}
          ariaLabelledby={`dropdown-label-${dropdownId}`}
          ariaControls={`dropdown-popup-${dropdownId}`}
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

        <div>
          {isOpen ? (
            <MultipleDropdownOptions>{items}</MultipleDropdownOptions>
          ) : null}
        </div>
      </DropdownBase>
    </MultipleDropdownContext.Provider>
  );
}

const MultipleDropdown = React.forwardRef<
  HTMLDivElement,
  DropdownProps<DropdownOptionProps>
>(MultipleDropdownInner);

export default MultipleDropdown;
