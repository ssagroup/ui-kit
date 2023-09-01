import React, {
  useState,
  useEffect,
  useRef,
  useId,
  ReactElement,
  JSXElementConstructor,
} from 'react';
import { useTheme } from '@emotion/react';
import { useClickOutside } from '@ssa-ui-kit/hooks';

import DropdownBase from '@components/DropdownBase';
import DropdownToggle from '@components/DropdownToggle';
import DropdownArrow from '@components/DropdownArrow';
import MultipleDropdownOptions from '@components/MultipleDropdownOptions';
import MultipleDropdownContext from '@components/MultipleDropdown/MultipleDropdown.context';
import { IDropdownOption } from '@components/DropdownOptions/types';

import { DropdownContextType, IDropdownProps } from './types';
import { getActiveItems } from '@components/MultipleDropdown/utils';

/**
 * The structure of the component:
 *
 * Dropdown
 *   DropdownToggle
 *   DropdownOptions
 *     DropdownOption
 *
 * Aria attributes are set according to
 * https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html
 **/
const MultipleDropdown = <T extends IDropdownOption>({
  selectedItems = [],
  isDisabled,
  isOpen: isInitOpen,
  children,
  onChange: handleChange,
  className,
}: IDropdownProps<T>) => {
  const theme = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const placeholder = 'Select something';
  const dropdownId = useId();

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(isInitOpen || false);
  const [colors, setColors] = useState<Array<string | undefined>>([]);
  const [options, setOptions] = useState<T[]>([]);
  const [optionsWithKey, setOptionsWithKey] = useState<
    Record<number | string, T>
  >({});
  const [items, setItems] = useState<
    ReactElement<any, string | JSXElementConstructor<any>>[]
  >([]);

  useEffect(() => {
    setOptions(Object.values(optionsWithKey));
  }, [optionsWithKey]);

  const onChange = (item) => {
    setOptionsWithKey((prevState) => ({
      ...prevState,
      [item.value]: {
        ...prevState[item.value],
        isSelected: !prevState[item.value].isSelected,
      },
    }));

    if (isDisabled || !item) {
      return;
    }

    handleChange && handleChange(options);
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
    const keyedOptions = {};
    const childItems = (childrenArray as React.ReactElement[]).map(
      (child, index) => {
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
      },
    );

    setOptionsWithKey(keyedOptions);
    setItems(childItems);
  }, []);

  const contextValue: DropdownContextType = React.useMemo(
    () => ({ onChange, allItems: optionsWithKey }),
    [onChange, optionsWithKey],
  );

  const values = getActiveItems({ allItems: options, placeholder });

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
          ariaControls={`dropdown-popup-${dropdownId}`}>
          {values.join(' | ')}
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
