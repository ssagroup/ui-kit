import React, { useState, useEffect, useId, useRef } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useClickOutside } from '@ssa-ui-kit/hooks';
import { mapObjIndexed } from '@ssa-ui-kit/utils';
import { useMergeRefs } from '@floating-ui/react';

import DropdownBase from '@components/DropdownBase';
import DropdownToggle from '@components/DropdownToggle';
import DropdownArrow from '@components/DropdownArrow';
import MultipleDropdownOptions from '@components/MultipleDropdownOptions';
import MultipleDropdownContext from '@components/MultipleDropdown/MultipleDropdown.context';
import { IDropdownOption } from '@components/DropdownOptions/types';

import { DropdownContextType, IDropdownProps } from './types';
import { getActiveItems } from '@components/MultipleDropdown/utils';
import MultipleDropdownNotification from '@components/MultipleDropdownNotification';

const DropdownPlaceholderLabel = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/**
 * The structure of the component:
 *
 * MultipleDropdown
 *   DropdownToggle
 *   MultipleDropdownOptions
 *     DropdownOption
 *
 * Aria attributes are set according to
 * https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html
 **/
function MultipleDropdownInner<T extends IDropdownOption>(
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
  }: IDropdownProps<T>,
  ref?: React.ForwardedRef<HTMLDivElement | null>,
) {
  const theme = useTheme();
  const dropdownBaseRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const dropdownId = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(isInitOpen || false);
  const [colors, setColors] = useState<Array<string | undefined>>([]);
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

  const onChange = (item: IDropdownOption) => {
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

    handleChange && handleChange(item.value, isSelected);
  };

  useClickOutside(dropdownBaseRef, () => isOpen && setIsOpen(false));

  useEffect(() => {
    if (isDisabled) {
      setColors([theme.colors.greyDarker60, theme.colors.grey20]);
    } else if (isOpen) {
      setColors([theme.colors.white, theme.colors.white60]);
    } else if (isFocused) {
      setColors([theme.colors.greyDarker, theme.colors.greyDarker60]);
    }
  }, [isOpen, isDisabled, isFocused]);

  useEffect(() => {
    if (isDisabled && isOpen) {
      setIsOpen(false);
    }
  }, [isDisabled]);

  useEffect(() => {
    const childrenArray = React.Children.toArray(children).filter(Boolean);
    const newOptions: T[] = [];
    const keyedOptions: Record<number | string, T> = {};
    const childItems: Array<React.ReactElement> = (
      childrenArray as React.ReactElement[]
    ).map((child, index) => {
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
    });

    setOptionsWithKey(keyedOptions);
    setItems(childItems);
  }, [memoSelectedItems, children]);

  const contextValue: DropdownContextType<IDropdownOption> = React.useMemo(
    () => ({ onChange, allItems: optionsWithKey, isMultiple }),
    [onChange, optionsWithKey, isMultiple],
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
          onFocus={setIsFocused.bind(null, true)}
          colors={colors}
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

        {isOpen ? (
          <MultipleDropdownOptions>{items}</MultipleDropdownOptions>
        ) : null}
      </DropdownBase>
    </MultipleDropdownContext.Provider>
  );
}

const MultipleDropdown = React.forwardRef<
  HTMLDivElement,
  IDropdownProps<IDropdownOption>
>(MultipleDropdownInner);

export default MultipleDropdown;
