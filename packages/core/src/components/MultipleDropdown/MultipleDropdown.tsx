import React, { useState, useEffect, useRef, useId } from 'react';
import { useTheme } from '@emotion/react';
import { useClickOutside } from '@ssa-ui-kit/hooks';
import { mapObjIndexed } from '@ssa-ui-kit/utils';

import DropdownBase from '@components/DropdownBase';
import DropdownToggle from '@components/DropdownToggle';
import DropdownArrow from '@components/DropdownArrow';
import MultipleDropdownOptions from '@components/MultipleDropdownOptions';
import MultipleDropdownContext from '@components/MultipleDropdown/MultipleDropdown.context';
import { IDropdownOption } from '@components/DropdownOptions/types';

import { DropdownContextType, IDropdownProps } from './types';
import { getActiveItems } from '@components/MultipleDropdown/utils';
import MultipleDropdownNotification from '@components/MultipleDropdownNotification/MultipleDropdownNotification';
import styled from '@emotion/styled';

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
const MultipleDropdown = <T extends IDropdownOption>({
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
}: IDropdownProps<T>) => {
  const theme = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownId = useId();

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(isInitOpen || false);
  const [colors, setColors] = useState<Array<string | undefined>>([]);
  const [optionsWithKey, setOptionsWithKey] = useState<
    Record<number | string, T>
  >({});
  const [items, setItems] = useState<Array<React.ReactElement>>([]);

  const onChange = (item: IDropdownOption) => {
    if (isDisabled || !item) {
      return;
    }
    if (!isMultiple && optionsWithKey[item.value].isSelected) {
      return;
    }
    let newOptionsWithKey = {};
    if (isMultiple) {
      newOptionsWithKey = {
        ...optionsWithKey,
        [item.value]: {
          ...optionsWithKey[item.value],
          isSelected: !optionsWithKey[item.value].isSelected,
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

    handleChange && handleChange(Object.values(newOptionsWithKey));
  };

  useClickOutside(dropdownRef, () => isOpen && setIsOpen(false));

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
        isSelected: !!selectedItems.find(
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
  }, []);

  const contextValue: DropdownContextType<IDropdownOption> = React.useMemo(
    () => ({ onChange, allItems: optionsWithKey, isMultiple }),
    [onChange, optionsWithKey, isMultiple],
  );

  const values = getActiveItems({ allItems: optionsWithKey, placeholder });
  const valuesWithoutPlaceholder = values.filter(
    (item) => item !== placeholder,
  );

  return (
    <MultipleDropdownContext.Provider value={contextValue}>
      <DropdownBase ref={dropdownRef} data-testid="dropdown">
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
};

export default MultipleDropdown;
