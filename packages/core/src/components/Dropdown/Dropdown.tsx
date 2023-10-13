import React, { useState, useEffect, useRef, useId, ReactNode } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useClickOutside } from '@ssa-ui-kit/hooks';

import DropdownToggle from '@components/DropdownToggle';
import DropdownArrow from '@components/DropdownArrow';
import DropdownOptions from '@components/DropdownOptions';
import DropdownContext from '@components/Dropdown/Dropdown.context';
import { IDropdownOption } from '@components/DropdownOptions/types';

import { DropdownContextType, IDropdownProps } from './types';

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

const DropdownBase = styled.div`
  display: inline-block;
  position: relative;
`;

const Dropdown = <T extends IDropdownOption>({
  selectedItem,
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
  const options: T[] = [];

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(isInitOpen || false);
  const [colors, setColors] = useState<Array<string | undefined>>([]);
  const [activeItem, setActiveItem] = useState<T | undefined>(selectedItem);

  const onChange: DropdownContextType['onChange'] = (item) => {
    const innerItem = options.filter((option) => option.value === item)[0];

    setIsOpen(false);

    if (isDisabled || !item) {
      return;
    }

    if (innerItem.value === activeItem?.value) {
      return;
    }

    setActiveItem(innerItem);
    handleChange && handleChange(innerItem);
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

  const childrenArray = React.Children.toArray(children).filter(Boolean);

  const items = (childrenArray as React.ReactElement[]).map((child, index) => {
    options.push(child.props);

    return React.cloneElement(child, {
      index,
      onClick: onChange.bind(this),
      ...child.props,
    });
  });

  const contextValue: DropdownContextType = React.useMemo(
    () => ({ onChange, activeItem }),
    [onChange, activeItem],
  );

  const value = (
    activeItem
      ? activeItem.label ||
        activeItem.children ||
        activeItem.value ||
        activeItem ||
        placeholder
      : placeholder
  ) as ReactNode;

  return (
    <DropdownContext.Provider value={contextValue}>
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
          {value}
          <DropdownArrow isUp={isOpen} />
        </DropdownToggle>

        {isOpen ? <DropdownOptions>{items}</DropdownOptions> : null}
      </DropdownBase>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
