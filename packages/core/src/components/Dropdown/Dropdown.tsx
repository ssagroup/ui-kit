import React, { useState, useEffect, useRef, useId, ReactNode } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useClickOutside } from '@ssa-ui-kit/hooks';

import DropdownToggle from '@components/DropdownToggle';
import DropdownArrow from '@components/DropdownArrow';
import DropdownOptions from '@components/DropdownOptions';
import DropdownContext from '@components/Dropdown/Dropdown.context';
import { DropdownOptionProps } from '@components/DropdownOptions/types';

import { DropdownContextType, DropdownProps } from './types';

const DropdownBase = styled.div`
  display: inline-block;
  position: relative;
`;

/**
 * Dropdown - Select-like dropdown component for single selection
 *
 * A flexible dropdown component that allows users to select one option from
 * a list of choices. Uses a compound component pattern with DropdownOption
 * children. Provides keyboard navigation, accessibility features, and click-outside
 * to close functionality.
 *
 * Component structure:
 * - Dropdown (root container with context)
 *   - DropdownToggle (button that opens/closes dropdown)
 *   - DropdownOptions (menu container that appears when open)
 *     - DropdownOption (individual selectable items)
 *
 * @category Form Controls
 * @subcategory Selection
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: 1, value: 'Apple' },
 *   { id: 2, value: 'Banana' },
 *   { id: 3, value: 'Cherry' },
 * ];
 *
 * <Dropdown
 *   selectedItem={items[0]}
 *   onChange={(item) => handleSelection(item)}
 *   placeholder="Select a fruit"
 * >
 *   {items.map(item => (
 *     <DropdownOption key={item.id} value={item.id}>
 *       {item.value}
 *     </DropdownOption>
 *   ))}
 * </Dropdown>
 * ```
 *
 * @example
 * ```tsx
 * // Controlled open state
 * const [isOpen, setIsOpen] = useState(false);
 * <Dropdown
 *   isOpen={isOpen}
 *   onChange={handleChange}
 *   selectedItem={selected}
 * >
 *   {options.map(opt => (
 *     <DropdownOption key={opt.id} value={opt.id}>
 *       {opt.label}
 *     </DropdownOption>
 *   ))}
 * </Dropdown>
 * ```
 *
 * @example
 * ```tsx
 * // With custom props for sub-components
 * <Dropdown
 *   selectedItem={selected}
 *   onChange={handleChange}
 *   dropdownProps={{
 *     base: { id: 'my-dropdown' },
 *     toggleButton: { 'data-testid': 'dropdown-toggle' },
 *     toggleButtonArrow: { className: 'custom-arrow' }
 *   }}
 * >
 *   {options.map(opt => (
 *     <DropdownOption key={opt.id} value={opt.id}>
 *       {opt.label}
 *     </DropdownOption>
 *   ))}
 * </Dropdown>
 * ```
 *
 * @see {@link DropdownOption} - Child component for individual options
 * @see {@link DropdownToggle} - Toggle button component
 * @see {@link DropdownOptions} - Options menu container
 *
 * @accessibility
 * - ARIA attributes set according to WAI-ARIA combobox pattern
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Click outside to close
 * - Screen reader friendly
 * - Focus management
 *
 * @see https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html
 */
const Dropdown = <T extends DropdownOptionProps>({
  selectedItem,
  isDisabled,
  isOpen: isInitOpen,
  children,
  onChange: handleChange,
  className,
  placeholder = 'Select something',
  dropdownProps: componentProps,
}: DropdownProps<T>) => {
  const theme = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownId = useId();
  const options: T[] = [];

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(isInitOpen || false);
  const [colors, setColors] = useState<Array<string | undefined>>([]);
  const [activeItem, setActiveItem] = useState<T | undefined>(selectedItem);

  const onChange: DropdownContextType['onChange'] = (item) => {
    const innerItem = options.filter((option) => option.value === item)[0];

    setIsOpen(false);

    if (isDisabled || !innerItem) {
      return;
    }

    if (innerItem.value === activeItem?.value) {
      return;
    }

    setActiveItem(innerItem);
    if (handleChange) {
      handleChange(innerItem);
    }
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
    setActiveItem(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    if (isDisabled && isOpen) {
      setIsOpen(false);
    }
  }, [isDisabled]);

  const childrenArray = React.Children.toArray(children).filter(Boolean);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = (childrenArray as React.ReactElement<any>[]).map(
    (child, index) => {
      options.push(child.props);

      return React.cloneElement(child, {
        index,
        onClick: onChange.bind(this),
        ...child.props,
      });
    },
  );

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
      <DropdownBase
        {...componentProps?.base}
        ref={dropdownRef}
        data-testid="dropdown">
        <DropdownToggle
          {...componentProps?.toggleButton}
          className={className}
          isOpen={isOpen}
          disabled={isDisabled}
          onClick={setIsOpen.bind(null, !isOpen)}
          onFocus={setIsFocused.bind(null, true)}
          colors={colors}
          ariaLabelledby={`dropdown-label-${dropdownId}`}
          ariaControls={`dropdown-popup-${dropdownId}`}>
          {value}
          <DropdownArrow {...componentProps?.toggleButtonArrow} isUp={isOpen} />
        </DropdownToggle>

        {isOpen ? <DropdownOptions>{items}</DropdownOptions> : null}
      </DropdownBase>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
